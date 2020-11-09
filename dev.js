import { NavigateTrait } from './navigate-trait.js';
import { define } from 'xtal-element/XtalElement.js';
const accountId = Symbol('accountId');
const statementId = Symbol('statementId');
const statementPageNo = Symbol('statementPageNo');
const transactionsFrom = Symbol('transactionsFrom');
const transactionsTo = Symbol('transactionsTo');
export class DevTest extends NavigateTrait {
    constructor() {
        super(...arguments);
        this.routeMappingRules = {
            myAccounts: {
                '*': [accountId, parseInt, (x) => x % 11 === 0, {
                        statements: {
                            '*': [statementId, , , {}],
                            '?': {
                                page: [statementPageNo, parseInt]
                            }
                        },
                        transactions: {
                            '?': {
                                from: [transactionsFrom, Date.parse],
                                to: [transactionsTo, Date.parse]
                            },
                        }
                    }],
            }
        };
        this.historyStateMapping = {
            myContext: {
                mySubContext: {
                    accountInfo: {
                        id: accountId,
                        statementInfo: {
                            id: statementId
                        },
                        statementView: {
                            pageNo: statementPageNo
                        }
                    },
                    transactionsView: {
                        from: transactionsFrom,
                        to: transactionsTo
                    }
                }
            }
        };
    }
}
DevTest.is = 'dev-test';
define(DevTest);
