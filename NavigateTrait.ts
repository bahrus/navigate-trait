import {XtalDecor, PropAction} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';
import {route_change} from './NavigateATrait.js';

export class NavigateTrait extends XtalDecor {

    static is = 'navigate-trait';

    upgrade = 'nav';

    capture = {
        [route_change]: ({}, e: Event) => {
            console.log(e);
        }
    }

    init = (h: HTMLElement) => {};
    actions = [];
}

define(NavigateTrait);