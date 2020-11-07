import {XtalDecor, PropAction, propActions} from 'xtal-decor/xtal-decor.js';
import {define, AttributeProps} from 'xtal-element/XtalElement.js';
import {route_change} from './un-curl.js';
import {RouteMappingRules, HistoryStateMappings} from './types.d.js';
import {UnCurl} from './un-curl.js';


export class NavigateTrait extends XtalDecor {

    static is = 'navigate-trait';

    static attributeProps : any = ({routeMappingRules, historyStateMapping}: NavigateTrait) => ({
        obj: [routeMappingRules, historyStateMapping]
    } as AttributeProps);

    upgrade = 'nav';

    capture = {
        [route_change]: ({self}: XtalDecor, e: Event) => {
            console.log(e);
            console.log(self.id);
        }
    }

    init = (h: HTMLElement) => {
        if(this.querySelector(UnCurl.is) === null){
            const uncurl = document.createElement(UnCurl.is);
            this.appendChild(uncurl);
        }
        
    };
    actions = [];
    ifWantsToBe = 'a-client-side-router';
    
    routeMappingRules: RouteMappingRules | undefined;
    historyStateMapping: HistoryStateMappings | undefined;
}

define(NavigateTrait);