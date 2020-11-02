import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
import { route_change } from './un-curl.js';
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
        this.init = (h) => { };
        this.actions = [];
        this.ifWantsToBe = 'a-client-side-router';
    }
}
NavigateTrait.is = 'navigate-trait';
define(NavigateTrait);