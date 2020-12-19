import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { route_changed, BeANavLink } from 'be-a-nav-link/be-a-nav-link.js';
let initiatedHistory = false;
export class NavigateTrait extends XtalDecor {
    constructor() {
        super(...arguments);
        this.upgrade = 'nav';
        this._lastTimeStamp = 0;
        this.capture = {
            [route_changed]: ({ self }, e) => {
                if (e.timeStamp === this._lastTimeStamp)
                    return;
                this._lastTimeStamp = e.timeStamp;
                const anchor = e.target;
                if (anchor.href) {
                    this.parseURL(anchor.href, anchor);
                }
            }
        };
        this.init = (h) => {
            if (this.querySelector(BeANavLink.is) === null) {
                const banl = document.createElement(BeANavLink.is);
                if (this.hasAttribute('a-trait-attr')) {
                    banl.ifWantsToBe = 'a-trait-attr';
                }
                this.appendChild(banl);
            }
            if (!initiatedHistory) {
                if (history.state == null) {
                    this.parseURL(location.href);
                }
                initiatedHistory = true;
            }
        };
        this.actions = [];
        this.ifWantsToBe = 'a-router';
    }
}
