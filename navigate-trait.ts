import {XtalDecor, PropAction, propActions} from 'xtal-decor/xtal-decor.js';
import {define, AttributeProps} from 'xtal-element/XtalElement.js';
import {route_change} from './un-curl.js';
import {RouteMappingRules, HistoryStateMappings, RouteMappingRule, RouteContext} from './types.d.js';
import {UnCurl} from './un-curl.js';

function parseLink(link: HTMLAnchorElement, self: NavigateTrait){
    const ctx: RouteContext = {
        pinnedData: {},
        state: {},
        linkInfo:{
            href: link.href,
            title: link.innerText
        }
    };
    parseURL(ctx, self);
}

function parseURL(ctx: RouteContext, self:NavigateTrait){
    if(self.routeMappingRules === undefined || self.historyStateMapping === undefined) return;
    const splitHref = ctx.linkInfo.href.split('?')[0].split('/');

    for(const key in self.routeMappingRules){
        const iPos = splitHref.indexOf(key);
        const rules = self.routeMappingRules[key];
        if(iPos > -1){
            matchRoute(splitHref.slice(iPos + 1), rules as RouteMappingRules, ctx);
        }
    }
    buildHistoryState(ctx, self.historyStateMapping, ctx.state);
    const mergedState = Object.assign({...history.state}, ctx.state);
    window.history.pushState(mergedState, ctx.linkInfo.title, ctx.linkInfo.href);
}

function buildHistoryState(ctx: RouteContext, hsm: HistoryStateMappings, state: any){
    for(const key in hsm){
        const rhs = hsm[key]
        switch(typeof rhs){
            case 'symbol':
                const val = ctx.pinnedData[hsm[key] as any as string];
                if(val === undefined) {
                    delete state[key];
                }else{
                    state[key] = val;
                }
                break;
            case 'object':
                
                if(Array.isArray(rhs)){
                    const len = rhs.length;
                    let foundValidKey = false;
                    for(let i = 0, ii = len - 1; i < ii; i++){
                        const sym = rhs[i] as symbol;
                        if(ctx.pinnedData[sym as any as string] !== undefined){
                            foundValidKey = true;
                            break;
                        }
                    }
                    if(foundValidKey){
                        state[key] = {};
                        buildHistoryState(ctx, rhs[len - 1] as HistoryStateMappings, state[key]);
                    }else{
                        delete state[key];
                    }
                    
                }else{
                    state[key] = {};
                    buildHistoryState(ctx, rhs as HistoryStateMappings, state[key]);
                }
                
                break;
        }
    }
}

function matchRoute(splitHref: string[], mappingRules: RouteMappingRules, ctx: RouteContext){
    for(const key in mappingRules){
        
        switch(key){
            case '*':{
                    const rule = mappingRules[key] as RouteMappingRule;
                    const sym = rule[0];
                    let val = splitHref[0];
                    if(sym !== undefined && val !== undefined){
                        const dataConverter = rule[1];
                        if(dataConverter !== undefined){
                            val = dataConverter(val);
                        }
                        const test = rule[2];
                        if(test !== undefined){
                            if(test(val) !== true) continue;
                        }
                        ctx.pinnedData[sym as any as string] = val;
                    }
                    const subRule = rule[3] as RouteMappingRules;
                    if(splitHref.length > 1){
                        matchRoute(splitHref.slice(1), subRule, ctx);
                    }
                    break;
                }
            case '?':{
                    matchQueryString(mappingRules['?'] as RouteMappingRules, ctx);
                }
                break;
            default:
                if(key === splitHref[0]){
                    const rules = mappingRules[key] as RouteMappingRules;
                    if(splitHref.length > 0){
                        matchRoute(splitHref.slice(1), rules, ctx);
                    }
                }
                
        }
    }
}

function matchQueryString(mappingRules: RouteMappingRules, ctx: RouteContext){
    const queryString = ctx.linkInfo.href.split('?')[1];
    if(queryString === undefined) return;
    const params = new URLSearchParams(queryString);
    for(const key in mappingRules){
        let val = params.get(key);
        if(val !== null){
            const rule = mappingRules[key] as RouteMappingRule;
            const sym = rule[0];
            const dataConverter = rule[1];
            if(dataConverter !== undefined){
                val = dataConverter(val);
            }
            const test = rule[2];
            if(test !== undefined){
                if(!test(val)) continue;
            }
            ctx.pinnedData[sym as any as string] = val;
        }
    }
}

export const initHistoryState = ({routeMappingRules, historyStateMapping, self}: NavigateTrait) => {
    if(routeMappingRules === undefined || historyStateMapping === undefined) return;
    if(history.state !== null) return;
    const ctx: RouteContext = {
        pinnedData: {},
        state: {},
        linkInfo:{
            href: location.href,
            title: document.head.title
        }
    };
    parseURL(ctx, self);
}

export const navigatePropsActions = [...propActions, initHistoryState];

export class NavigateTrait extends XtalDecor {

    static is = 'navigate-trait';

    static attributeProps : any = ({routeMappingRules, historyStateMapping}: NavigateTrait) => ({
        obj: [routeMappingRules, historyStateMapping]
    } as AttributeProps);

    propActions = navigatePropsActions;

    upgrade = 'nav';

    _lastTimeStamp: number = 0;

    capture = {
        [route_change]: ({self}: XtalDecor, e: Event) => {
            if(e.timeStamp === this._lastTimeStamp) return;
            this._lastTimeStamp = e.timeStamp;
            console.log(e.timeStamp);
            parseLink(e.target as HTMLAnchorElement, this);
        }
    }

    init = (h: HTMLElement) => {
        if(this.querySelector(UnCurl.is) === null){
            const uncurl = document.createElement(UnCurl.is);
            this.appendChild(uncurl);
        }
        
    };
    actions = [];
    ifWantsToBe = 'a-router';
    
    routeMappingRules: RouteMappingRules | undefined;
    historyStateMapping: HistoryStateMappings | undefined;
}

define(NavigateTrait);