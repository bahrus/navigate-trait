# navigate-trait

<a href="https://nodei.co/npm/navigate-trait/"><img src="https://nodei.co/npm/navigate-trait.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/navigate-trait">

navigate-trait enhances the "nav" and "a" (anchor) tag, in order to support client-side routing.

It is inspired by the article [How To Extend a Native HTML Element](https://itnext.io/how-to-extend-a-native-html-element-1d4674e09c22).

In order to "opt-in", the nav and anchor tags should have the (customizable) attributes "be-a-router" and "be-a-nav-link":

```html
<nav id=test be-a-router>
    <a  be-a-nav-link href="myAccounts/14394402/statements/201904?page=1">
        Statement for April 2019
    </a>
    <br>
    <a be-a-nav-link href="myAccounts/398821401/transactions?from=2020-10-01&to=2020-11-19">
        Transactions for 10/1/2020 - 11/19/2020
    </a>
</nav>
```

In contrast to more traditional routing link solutions, perhaps, navigate-trait places great emphasis on fine tuning how to parse the address bar, and updating history.state
with typed keys found in the address bar.  

The mapping rules are best demonstrated [by example](https://github.com/bahrus/navigate-trait/blob/baseline/dev.ts#L14), which maps the url's shown above into history.state (and opens the url's via client-side routing.)

##  iFrame you [TODO]

The hyperlink tag supports a target attribute, which causes an iframe to load the content of the url.  However, this doesn't update the address bar, so it is difficult to bookmark or email this state.

```html
<nav>
    <a href="a.html" target="myIFrame">A</a>
    <br>
    <a href="b.html" target="myIFrame">B</a>

</nav>
<iframe name="myIFrame"></iframe>
```

Now we don't need to block the link from doing it's thing.  We do need to update the address bar.  Suggested syntax:

https://mydomain.com/contextPath/myResource?myIFrame=a.html

nav needs to confirm it has a hyperlink child with target=myIframe and href=a.html

If confirmed, then it sets myIFrame's src = a.html.

