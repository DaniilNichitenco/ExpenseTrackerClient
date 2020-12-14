import Expense from '../../Data/Models/Expenses/Expense';
import ExpenseForSum from '../../Data/Models/Expenses/ExpenseForSum';
import ExpensesForYear from '../../Data/Models/Expenses/ExpensesForYear';
import Topic from '../../Data/Models/Topics/Topic';
import API from '../Api';
import { getCurrentUser } from '../auth.services/auth-service';
import PagedRequest from '../pagedRequests/PagedRequest';
import RequestFilters from '../pagedRequests/RequestFilters';
import jwt_decode from 'jwt-decode';
import PagedResult from '../pagedRequests/PagedResult';
import LogicalOperators from '../pagedRequests/LogicalOperators';
import ExpenseForCreate from '../../Data/Models/Expenses/ExpenseForCreate';
import PercentsTopicExpense from '../../Data/Models/Expenses/PercentsTopicExpense';
import PurseExpensesPerDay from '../../Data/Models/Expenses/PurseExpensesPerDay';

export const getAllExpenses = async () => {
    
    return API.get("/expenses/all")
        .then(response => {
            let expenses: Expense[] = [];
            let data:any[] = response.data;

            data.forEach(element => {
                let dateString = element.date;
                let date = dateString.substring(0, 10);
                let expense:Expense = {
                    id: element.id,
                    purseId: element.purseId,
                    title: element.title,
                    money: element.money,
                    date: new Date(date),
                };
                
                expenses.push(expense);
            });

            return {
                response: response,
                data: expenses
            };
        })
        .catch(error => {
            console.log(error);
            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const getExpensesForCurrentYear = async () => {
    
    return API.get("/expenses/year")
        .then(response => {
            let expenses:ExpensesForYear[] = response.data.expenses;
            console.log(expenses);
            
            return {
                response: response,
                data: expenses
            };
        })
        .catch(error => {
            console.log(error);
            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const deleteExpense = async (id: number) => {

    return API.delete("/expenses/" + id)
        .then(response => {
            console.log(response);

            return {
                response: response,
                data: response.data
            };
        })
        .catch(error => {
            console.log(error);
            
            return {
                response: error.response,
                data: error.response.data
            };
        })
}

export const updateExpense = async (expense: Expense) => {

    return API.put("/expenses", expense)
        .then(response => {
            console.log(response);
            return {
                response: response,
                data: response.data
            };
        })
        .catch(error => {
            console.log(error);
            return {
                response: error.response,
                data: error.response.data
            };
        })
}

export const getExpensesSumForYear = async () => {

    return API.get("/expenses/sum/year")
        .then(response => {
            console.log(response);
            const sums: ExpenseForSum[] = response.data.sums;

            return {
                response: response,
                data: sums
            };
        })
        .catch(error => {
            console.log(error);
            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const getExpensesSumForMonth = async () => {

    return API.get("/expenses/sum/month")
        .then(response => {
            console.log(response);
            const sums: ExpenseForSum[] = response.data.sums;

            return {
                response: response,
                data: sums
            };
        })
        .catch(error => {
            console.log(error);
            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const getExpensesSumForToday = async () => {

    return API.get("/expenses/sum/today")
        .then(response => {
            console.log(response);
            const sums: ExpenseForSum[] = response.data.sums;

            return {
                response: response,
                data: sums
            };
        })
        .catch(error => {
            console.log(error);
            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const getUserExpenses = async () => {

    return API.get("/expenses")
        .then(response => {
            let expenses: Expense[] = [];
            let data:any[] = response.data;

            data.forEach(element => {
                let dateString = element.date;
                let date = dateString.substring(0, 10);
                let expense:Expense = {
                    id: element.id,
                    purseId: element.purseId,
                    title: element.title,
                    money: element.money,
                    date: new Date(date),
                };
                
                expenses.push(expense);
            });
            
            return {
                response: response,
                data: expenses
            };
        })
        .catch(error => {
            console.log(error);

            return {
                response:error.response,
                data: error.response.data
            };
        })
}

export const getUserExpensesByTopic = async (topic: Topic) => {

    return API.get("/expenses/topic/" + topic.id)
        .then(response => {
            let expenses: Expense[] = [];
            let data:any[] = response.data;

            data.forEach(element => {
                let dateString = element.date;
                let date = dateString.substring(0, 10);
                let expense:Expense = {
                    id: element.id,
                    purseId: element.purseId,
                    title: element.title,
                    money: element.money,
                    date: new Date(date),
                };
                
                expenses.push(expense);
            });
            
            return {
                response: response,
                data: expenses
            };
        })
        .catch(error => {
            console.log(error);

            return {
                response:error.response,
                data: error.response.data
            };
        })
}

export const getPagedUserExpenses = async (request: PagedRequest, topic?: Topic) => {

    const token = getCurrentUser().accessToken;
    const userId: string = (jwt_decode(token) as any).UserId;

    const filters: RequestFilters = {
        logicalOperators: LogicalOperators.and,
        filters: [
            {
                path: "OwnerId",
                value: userId
            }
        ]
    }

    if(topic != undefined)
    {
        filters.filters.push(
            {
                path: "TopicId",
                value: topic.id.toString()
            }
        );
    }

    request.requestFilters = filters;
    if(request.columnNameForSorting == undefined)
    {
        request.columnNameForSorting = "Date";
        request.sortDirection = "DESC";
    }
    if(request.sortDirection == undefined)
    {
        request.sortDirection = "ASC";
    }
    
    return API.post("Expenses/PaginatedSearch", request)
        .then(response => {
            let result: PagedResult<Expense> = response.data;
            let expenses: Expense[] = [];

            result.items.forEach(e => {
                let dateString = e.date.toString();
                let date = dateString.substring(0, 10);
                let expense:Expense = {
                    id: e.id,
                    purseId: e.purseId,
                    title: e.title,
                    money: e.money,
                    date: new Date(date),
                };
                expenses.push(expense);
            });

            result.items = expenses;

            return {
                response: response,
                data: result
            };
        })
        .catch(error => {
            console.log(error);

            return {
                response:error.response,
                data: error.response.data
            };
        });
}

export const createExpense = async (expense: ExpenseForCreate) => {
    return API.post("Expenses", expense)
        .then(response => {
            return {
                response: response,
                data: response.data
            }
        })
        .catch(error => {
            return{
                response: error.response,
                data: error.response.data
            }
        });
}

export const getExpense = async (id: number) => {
    return API.get("Expenses/" + id)
        .then(response => {
            const expense: Expense = response.data;
            let dateString = response.data.date.toString().substring(0, 10);
            expense.date = new Date(dateString);

            return {
                response: response,
                data: expense
            };
        })
        .catch(error => {
            console.log(error);

            return {
                response:error.response,
                data: error.response.data
            };
        });
}

export const getPercentsExpensesPerTopic = async () => {
    return API.get("Expenses/percentsExpensesPerTopic")
        .then(response => {
            let percents: PercentsTopicExpense[] = response.data;
            console.log(percents);

            return{
                data: percents,
                response: response
            };
        })
        .catch(error => {
            console.log(error);

            return{
                data: error.response.data,
                response: error.response
            }
        });
}

export const getCountUserExpenses = async () => {
    return API.get("Expenses/count")
        .then(response => {

            return{
                response: response,
                data: response.data as number
            };
        })
        .catch(error => {

            return{
                response: error.response,
                data: error.response.data
            };
        });
}

export const getExpensesPerDayForCurrentMonth = async () => {
    return API.get("Expenses/month")
        .then(response => {

            return{
                response: response,
                data: response.data as PurseExpensesPerDay[]
            };
        })
        .catch(error => {
            
            return{
                response: error.response,
                data: error.response.data
            };
        })
}

export default {
    getExpensesForCurrentYear,
    getAllExpenses,
    deleteExpense,
    getExpensesSumForToday,
    getExpensesSumForMonth,
    getExpensesSumForYear,
    getUserExpensesByTopic,
    getUserExpenses,
    getPagedUserExpenses,
    getExpense,
    createExpense,
    updateExpense,
    getPercentsExpensesPerTopic,
    getCountUserExpenses,
    getExpensesPerDayForCurrentMonth
}