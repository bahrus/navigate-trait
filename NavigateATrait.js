import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
export class NavigateATrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.on = {
            'click': ({ self }, e) => {
                console.log(e);
                e.preventDefault();
                self.dispatchEvent(new CustomEvent('route-change', {
                    detail: {
                        link: this
                    }
                }));
            }
        };
        this.init = (h) => {
        }; // as PropAction<HTMLElement>;
        this.actions = [];
        this.upgrade = 'a';
    }
}
NavigateATrait.is = 'navigate-a-trait';
define(NavigateATrait);
