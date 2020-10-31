import {XtalDecor, PropAction} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';

export class NavigateATrait extends XtalDecor {
    static is='navigate-a-trait';
    on = {
        'click':({self}: any, e: Event) =>{
            console.log(e);
            e.preventDefault();
            self.dispatchEvent(new CustomEvent('route-change',{
                detail: {
                    link: this
                }
            }));
        }
    };
    init = (h: HTMLElement) => {

    };// as PropAction<HTMLElement>;
    actions = [];
    upgrade = 'a';

}
define(NavigateATrait);