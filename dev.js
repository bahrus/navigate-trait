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
        this.historyStateMappingx = {
            myContext: {
                mySubContext: {
                    accountInfo: [accountId, {
                            id: accountId,
                            statementInfo: [statementId, {
                                    id: statementId
                                }],
                            statementView: [statementPageNo, {
                                    pageNo: statementPageNo
                                }]
                        }],
                    transactionsView: [transactionsFrom, transactionsTo, {
                            from: transactionsFrom,
                            to: transactionsTo //only create to if transactionsTo has a value
                        }]
                }
            }
        };
    }
}
DevTest.is = 'dev-test';
define(DevTest);
