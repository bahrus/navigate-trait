import {XtalDecor, PropAction} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';
import {route_change} from './un-curl.js';

export class NavigateTrait extends XtalDecor {

    static is = 'navigate-trait';

    upgrade = 'nav';

    capture = {
        [route_change]: ({self}: XtalDecor, e: Event) => {
            console.log(e);
            console.log(self.id);
        }
    }

    init = (h: HTMLElement) => {};
    actions = [];
    ifWantsToBe = 'a-client-side-router';
}

define(NavigateTrait);