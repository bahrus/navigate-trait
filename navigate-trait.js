import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
import { route_change } from './un-curl.js';
import { UnCurl } from './un-curl.js';
function parse(link, self) {
    if (self.routeMappingRules === undefined || self.historyStateMapping === undefined)
        return;
    const splitHref = link.href.split('/');
    const ctx = {
        pinnedData: {}
    };
    for (const key in self.routeMappingRules) {
        const iPos = splitHref.indexOf(key);
        const rules = self.routeMappingRules[key];
        if (iPos > -1) {
            match(splitHref.slice(iPos + 1), rules, ctx);
        }
    }
}
function match(splitHref, mappingRules, ctx) {
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
                    match(splitHref.slice(1), subRule, ctx);
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
                        match(splitHref.slice(1), rules, ctx);
                    }
                }
        }
    }
}
function matchQueryString(mappingRules, ctx) {
    const queryString = location.search;
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
export class NavigateTrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.upgrade = 'nav';
        this.capture = {
            [route_change]: ({ self }, e) => {
                //console.log(e);
                //console.log(self.id);
                parse(e.target, this);
            }
        };
        this.init = (h) => {
            if (this.querySelector(UnCurl.is) === null) {
                const uncurl = document.createElement(UnCurl.is);
                this.appendChild(uncurl);
            }
        };
        this.actions = [];
        this.ifWantsToBe = 'a-client-side-router';
    }
}
NavigateTrait.is = 'navigate-trait';
NavigateTrait.attributeProps = ({ routeMappingRules, historyStateMapping }) => ({
    obj: [routeMappingRules, historyStateMapping]
});
define(NavigateTrait);
