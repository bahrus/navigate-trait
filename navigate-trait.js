import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { route_changed, BeANavLink } from 'be-a-nav-link/be-a-nav-link.js';
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
                this.parseLink(e.target);
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
        };
        this.actions = [];
        this.ifWantsToBe = 'a-router';
    }
}
