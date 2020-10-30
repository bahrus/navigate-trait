# navigate-trait

Inspired by [How To Extend a Native HTML Element](https://itnext.io/how-to-extend-a-native-html-element-1d4674e09c22).

Enhance the hyperlink and nav native elements to support local client-side routing.

Syntax

```html
<navigate-trait-link upgrade=a if-wants-to-be="a-navigation-link"></navigate-trait-link>
<navigate-trait upgrade=nav if-wants-to-be="a-client-side-router"></navigate-trait>

...

<nav disabled be-a-client-side-router>
<a be-a-navigation-link href="myAccounts/14394402/statements/201904?page=1" slot="link">
    Statement for April 2019
</a>
<a be-a-navigation-link href="myAccounts/398821400/transactions?from=20201001&to=20201119" slot="link">
    Transactions for 10/1/2020 - 11/19/2020
</a>
</nav>

```