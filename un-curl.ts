import {XtalDecor, PropAction} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';
export const route_change = 'route-change';
export class UnCurl extends XtalDecor {
    static is='un-curl';
    on = {
        click:({self}: any, e: Event) =>{
            e.preventDefault();
            self.dispatchEvent(new CustomEvent(route_change, {
                detail: {
                    link: this
                }
            }));
        }
    };
    init = (h: HTMLElement) => {};
    actions = [];
    upgrade = 'a';
    ifWantsToBe = 'a-nav-link';
}
define(UnCurl);