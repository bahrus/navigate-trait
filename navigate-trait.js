import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
import { route_change } from './un-curl.js';
import { UnCurl } from './un-curl.js';
export class NavigateTrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.upgrade = 'nav';
        this.capture = {
            [route_change]: ({ self }, e) => {
                console.log(e);
                console.log(self.id);
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
