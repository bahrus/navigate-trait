import {XtalDecor} from 'xtal-decor/xtal-decor.js';
import {route_changed, BeANavLink} from 'be-a-nav-link/be-a-nav-link.js';

let initiatedHistory = false;

export abstract class NavigateTrait extends XtalDecor {
    upgrade = 'nav';

    _lastTimeStamp: number = 0;

    capture = {
        [route_changed]: ({self}: XtalDecor, e: Event) => {
            if(e.timeStamp === this._lastTimeStamp) return;
            this._lastTimeStamp = e.timeStamp;
            const anchor = e.target as HTMLAnchorElement;
            if(anchor.href){
                this.parseURL(anchor.href);
            }
            
        }
    }

    abstract parseURL(url: string): void;

    init = (h: HTMLElement) => {
        if(this.querySelector(BeANavLink.is) === null){
            const banl = document.createElement(BeANavLink.is) as BeANavLink;
            if(this.hasAttribute('a-trait-attr')){
                banl.ifWantsToBe = 'a-trait-attr';
            }
            this.appendChild(banl);
        }
        if(!initiatedHistory){
            if(history.state == null){
                this.parseURL(location.href);
            }
            initiatedHistory = true;
        }
    };
    actions = [];
    ifWantsToBe = 'a-router';

}
