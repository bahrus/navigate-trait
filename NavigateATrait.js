import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
export const route_change = 'route-change';
export class NavigateATrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.on = {
            click: ({ self }, e) => {
                e.preventDefault();
                self.dispatchEvent(new CustomEvent(route_change, {
                    detail: {
                        link: this
                    }
                }));
            }
        };
        this.init = (h) => { };
        this.actions = [];
        this.upgrade = 'a';
    }
}
NavigateATrait.is = 'navigate-a-trait';
define(NavigateATrait);
