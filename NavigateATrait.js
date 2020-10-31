import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
export class NavigateATrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.on = {
            'click': ({ self }, e) => {
                console.log(e);
                e.preventDefault();
            }
        };
        this.init = (h) => {
        }; // as PropAction<HTMLElement>;
        this.actions = [];
    }
}
NavigateATrait.is = 'navigate-a-trait';
define(NavigateATrait);
