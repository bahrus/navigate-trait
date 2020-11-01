import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
import { route_change } from './NavigateATrait.js';
export class NavigateTrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.upgrade = 'nav';
        this.capture = {
            [route_change]: ({}, e) => {
                console.log(e);
            }
        };
        this.init = (h) => { };
        this.actions = [];
    }
}
NavigateTrait.is = 'navigate-trait';
define(NavigateTrait);
