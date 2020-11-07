import {XtalDecor, PropAction, propActions} from 'xtal-decor/xtal-decor.js';
import {define, AttributeProps} from 'xtal-element/XtalElement.js';
import {route_change} from './un-curl.js';
import {RouteMappingRules, HistoryStateMappings, RouteMappingRule, RouteContext} from './types.d.js';
import {UnCurl} from './un-curl.js';

function parse(link: HTMLAnchorElement, self: NavigateTrait){
    if(self.routeMappingRules === undefined || self.historyStateMapping === undefined) return;
    const splitHref = link.href.split('/');
    const ctx: RouteContext = {
        pinnedData: {}
    };
    for(const key in self.routeMappingRules){
        const iPos = splitHref.indexOf(key);
        const rules = self.routeMappingRules[key];
        if(iPos > -1){
            match(splitHref.slice(iPos + 1), rules as RouteMappingRules, ctx);
        }
    }
}

function match(splitHref: string[], mappingRules: RouteMappingRules, ctx: RouteContext){
    for(const key in mappingRules){
        switch(key){
            case '*':
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
                const subRule = rule[3];
                if(splitHref.length > 1){
                    match(splitHref.slice(1), mappingRules, ctx);
                }
                break;
        }
    }
}

export class NavigateTrait extends XtalDecor {

    static is = 'navigate-trait';

    static attributeProps : any = ({routeMappingRules, historyStateMapping}: NavigateTrait) => ({
        obj: [routeMappingRules, historyStateMapping]
    } as AttributeProps);

    upgrade = 'nav';

    capture = {
        [route_change]: ({self}: XtalDecor, e: Event) => {
            //console.log(e);
            //console.log(self.id);
            parse(e.target as HTMLAnchorElement, this);
        }
    }

    init = (h: HTMLElement) => {
        if(this.querySelector(UnCurl.is) === null){
            const uncurl = document.createElement(UnCurl.is);
            this.appendChild(uncurl);
        }
        
    };
    actions = [];
    ifWantsToBe = 'a-client-side-router';
    
    routeMappingRules: RouteMappingRules | undefined;
    historyStateMapping: HistoryStateMappings | undefined;
}

define(NavigateTrait);