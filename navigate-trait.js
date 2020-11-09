import { XtalDecor, propActions } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
import { route_change } from './un-curl.js';
import { UnCurl } from './un-curl.js';
import { mergeDeep } from 'trans-render/mergeDeep.js';
function parseLink(link, self) {
    const ctx = {
        pinnedData: {},
        state: {},
        linkInfo: {
            href: link.href,
            title: link.innerText
        }
    };
    parseURL(ctx, self);
}
function parseURL(ctx, self) {
    if (self.routeMappingRules === undefined || self.historyStateMapping === undefined)
        return;
    const splitHref = ctx.linkInfo.href.split('?')[0].split('/');
    for (const key in self.routeMappingRules) {
        const iPos = splitHref.indexOf(key);
        const rules = self.routeMappingRules[key];
        if (iPos > -1) {
            matchRoute(splitHref.slice(iPos + 1), rules, ctx);
        }
    }
    buildHistoryState(ctx, self.historyStateMapping, ctx.state);
    const mergedState = mergeDeep({ ...history.state }, ctx.state);
    window.history.pushState(mergedState, ctx.linkInfo.title, ctx.linkInfo.href);
}
function buildHistoryState(ctx, hsm, state) {
    for (const key in hsm) {
        switch (typeof hsm[key]) {
            case 'symbol':
                state[key] = ctx.pinnedData[hsm[key]];
                break;
            case 'object':
                state[key] = {};
                buildHistoryState(ctx, hsm[key], state[key]);
                break;
        }
    }
}
function matchRoute(splitHref, mappingRules, ctx) {
    for (const key in mappingRules) {
        switch (key) {
            case '*': {
                const rule = mappingRules[key];
                const sym = rule[0];
                let val = splitHref[0];
                if (sym !== undefined && val !== undefined) {
                    const dataConverter = rule[1];
                    if (dataConverter !== undefined) {
                        val = dataConverter(val);
                    }
                    const test = rule[2];
                    if (test !== undefined) {
                        if (test(val) !== true)
                            continue;
                    }
                    ctx.pinnedData[sym] = val;
                }
                const subRule = rule[3];
                if (splitHref.length > 1) {
                    matchRoute(splitHref.slice(1), subRule, ctx);
                }
                break;
            }
            case '?':
                {
                    matchQueryString(mappingRules['?'], ctx);
                }
                break;
            default:
                if (key === splitHref[0]) {
                    const rules = mappingRules[key];
                    if (splitHref.length > 1) {
                        matchRoute(splitHref.slice(1), rules, ctx);
                    }
                }
        }
    }
}
function matchQueryString(mappingRules, ctx) {
    const queryString = ctx.linkInfo.href.split('?')[1];
    if (queryString === undefined)
        return;
    const params = new URLSearchParams(queryString);
    for (const key in mappingRules) {
        let val = params.get(key);
        if (val !== null) {
            const rule = mappingRules[key];
            const sym = rule[0];
            const dataConverter = rule[1];
            if (dataConverter !== undefined) {
                val = dataConverter(val);
            }
            const test = rule[2];
            if (test !== undefined) {
                if (!test(val))
                    continue;
            }
            ctx.pinnedData[sym] = val;
        }
    }
}
export const initHistoryState = ({ routeMappingRules, historyStateMapping, self }) => {
    if (routeMappingRules === undefined || historyStateMapping === undefined)
        return;
    if (history.state !== null)
        return;
    const ctx = {
        pinnedData: {},
        state: {},
        linkInfo: {
            href: location.href,
            title: document.head.title
        }
    };
    parseURL(ctx, self);
};
export const navigatePropsActions = [...propActions, initHistoryState];
export class NavigateTrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.propActions = navigatePropsActions;
        this.upgrade = 'nav';
        this._lastTimeStamp = 0;
        this.capture = {
            [route_change]: ({ self }, e) => {
                if (e.timeStamp === this._lastTimeStamp)
                    return;
                this._lastTimeStamp = e.timeStamp;
                console.log(e.timeStamp);
                parseLink(e.target, this);
            }
        };
        this.init = (h) => {
            if (this.querySelector(UnCurl.is) === null) {
                const uncurl = document.createElement(UnCurl.is);
                this.appendChild(uncurl);
            }
        };
        this.actions = [];
        this.ifWantsToBe = 'a-router';
    }
}
NavigateTrait.is = 'navigate-trait';
NavigateTrait.attributeProps = ({ routeMappingRules, historyStateMapping }) => ({
    obj: [routeMappingRules, historyStateMapping]
});
define(NavigateTrait);
