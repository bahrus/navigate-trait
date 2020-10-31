import {XtalDecor, PropAction} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';

export class NavigateATrait extends XtalDecor {
    static is='navigate-a-trait';
    on = {
        'click':({self}, e) =>{
            console.log(e);
            e.preventDefault();
        }
    };
    init = (h: HTMLElement) =>{

    };// as PropAction<HTMLElement>;
    actions = [];

}
define(NavigateATrait);