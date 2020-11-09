import {NavigateTrait} from './navigate-trait.js';
import {RouteMappingRules, HistoryStateMappings} from './types.js';
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
                        
                    }],
                    '?': {
                        page: [statementPageNo, parseInt]
                    }
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

    historyStateMappingx = {
        myContext:{
            mySubContext:{
                accountInfo:[accountId, { //only create accountInfo if accountId has a value in context
                    id: accountId,
                    statementInfo: [statementId, { //only create statementInfo if statementId has a value in context
                        id: statementId
                    }],
                    statementView:[statementPageNo, {
                        pageNo: statementPageNo
                    }]
                }],
                transactionsView:[transactionsFrom, transactionsTo, { //only create transactionsView if either transactionsFrom or transactionsTo has value
                    from: transactionsFrom, //only create from if transactionsFrom has a value
                    to: transactionsTo //only create to if transactionsTo has a value
                }]
            }
            
        }
    } as any;

}
define(DevTest);