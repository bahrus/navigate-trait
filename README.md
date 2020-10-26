# navigate-trait

Enhance the hyperlink native element to use local client-side routing.

Syntax

```html
<navigate-trait upgrade=a if-wants-to-be="a-navigation-link">

...

<a id=myLink href="myAccounts/14394402/statements/20190418?page=1">My link</a>

<script>
myLink.setAttribute('be-a-navigation-link', JSON.stringify([
    {pathLHS: 'myAccounts', pathRHS: 'statements', statePath:'myAccounts.accountNo'},
    {pathLHS: 'statements', statePath: 'myAccounts.statement.Id'},
    {queryParam: 'page', statePath: 'myAccounts.statement.Page'}
]))
</script>

```