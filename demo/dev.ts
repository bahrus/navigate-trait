import {NavigateTrait} from '../navigate-trait.js';
import {RouteMappingRules, HistoryStateMappings} from '../types.d.js';
import {define} from 'xtal-element/XtalElement.js';

const accountId = Symbol('accountId');
const statementId = Symbol('statementId');
const statementPageNo = Symbol('statementPageNo');
const transactionsFrom = Symbol('transactionsFrom');
const transactionsTo = Symbol('transactionsTo');

export class DevTest extends NavigateTrait{
    static is = 'dev-test';

    routeMappingRules = {
        myAccounts:{
            '*': [accountId, parseInt, (x: number) => x % 11 === 0, {
                statements:{
                    '*' : [statementId,,,{
                        '?': {
                            page: [statementPageNo, parseInt]
                        }
                    }]
                },
                transactions:{
                    '?':{
                        from: [transactionsFrom, Date.parse],
                        to: [transactionsTo, Date.parse]
                    },
                }
            }],

        }
    } as RouteMappingRules;

    historyStateMapping = {
        myContext:{
            mySubContext:{
                accountInfo:{
                    id: accountId,
                    statementInfo:{
                        id: statementId
                    },
                    statementView:{
                        pageNo: statementPageNo
                    }
                },
                transactionsView:{
                    from: transactionsFrom,
                    to: transactionsTo
                }
            }
            
        }
    } as HistoryStateMappings;

}
define(DevTest);