# navigate-trait

<a href="https://nodei.co/npm/navigate-trait/"><img src="https://nodei.co/npm/navigate-trait.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/navigate-trait">

navigate-trait enhances the nav and a (anchor) tag, in order to support client side routing.

It is inspired by the article [How To Extend a Native HTML Element](https://itnext.io/how-to-extend-a-native-html-element-1d4674e09c22).

In contrast to more traditional routing link solutions, perhaps, navigate-trait places great emphasis on fine tuning how to parse the address bar, and updating history.state
with typed keys found in the address bar.  The mapping looks like this:

The mapping rules are best demonstrated [by example](https://github.com/bahrus/navigate-trait/blob/baseline/dev.ts#L14).

Syntax

```html
<navigate-a-trait upgrade=a if-wants-to-be="a-navigation-link"></navigate-a-trait>
<navigate-trait upgrade=nav if-wants-to-be="a-client-side-router"></navigate-trait>

...

<nav be-a-client-side-router>
    <a be-a-navigation-link href="myAccounts/14394402/statements/201904?page=1" slot="link">
        Statement for April 2019
    </a>
    <a be-a-navigation-link href="myAccounts/398821400/transactions?from=20201001&to=20201119" slot="link">
        Transactions for 10/1/2020 - 11/19/2020
    </a>
</nav>

```

