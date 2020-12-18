# navigate-trait

<a href="https://nodei.co/npm/navigate-trait/"><img src="https://nodei.co/npm/navigate-trait.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/navigate-trait">

navigate-trait enhances the "nav" and "a" (anchor) tag, in order to support client-side routing.

navigate-trait is an abstract class (if using Typescript), allowing for different approaches / libraries for parsing the url, and/or stringifying an object to the url [TODO].

It is inspired by the article [How To Extend a Native HTML Element](https://itnext.io/how-to-extend-a-native-html-element-1d4674e09c22).

In order to "opt-in", the anchor tags should have the (customizable) attribute "be-a-nav-link":

```html
<nav>
    <a be-a-nav-link href="myAccounts/14394402/statements/201904?page=1">
        Statement for April 2019
    </a>
    <br>
    <a be-a-nav-link href="myAccounts/398821401/transactions?from=2020-10-01&to=2020-11-19">
        Transactions for 10/1/2020 - 11/19/2020
    </a>
</nav>
```

or

```html
<nav>
    <a data-be-a-nav-link href="myAccounts/14394402/statements/201904?page=1">
        Statement for April 2019
    </a>
    <br>
    <a data-be-a-nav-link href="myAccounts/398821401/transactions?from=2020-10-01&to=2020-11-19">
        Transactions for 10/1/2020 - 11/19/2020
    </a>
</nav>
```

To customize the attribute ("be-a-nav-link") web components that extend this abstract class can use attribute "a-trait-attr".








