import Expense from '../../Data/Models/Expenses/Expense';
import ExpenseForSum from '../../Data/Models/Expenses/ExpenseForSum';
import ExpensesForYear from '../../Data/Models/Expenses/ExpensesForYear';
import Topic from '../../Data/Models/Topics/Topic';
import API from '../Api';
import { GetCurrentUser } from '../auth.services/auth-service';
import PagedRequest from '../pagedRequests/PagedRequest';
import RequestFilters from '../pagedRequests/RequestFilters';
import jwt_decode from 'jwt-decode';
import PagedResult from '../pagedRequests/PagedResult';
import LogicalOperators from '../pagedRequests/LogicalOperators';

export const GetAllExpenses = async () => {
    
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

export const GetExpensesForCurrentYear = async () => {
    
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

export const DeleteExpense = async (id: number) => {

    API.delete("/expenses/" + id)
        .then(response => {
            console.log(response);

            return {response: response};
        })
        .catch(error => {
            console.log(error);
            
            return {response: error.response};
        })
}

export const UpdateExpense = async (id: number) => {

    return API.put("/expenses")
        .then(response => {
            console.log(response);
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        })
}

export const GetExpensesSumForYear = async () => {

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

export const GetExpensesSumForMonth = async () => {

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

export const GetExpensesSumForToday = async () => {

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

export const GetUserExpenses = async () => {

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

export const GetUserExpensesByTopic = async (topic: Topic) => {

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

export const GetPagedUserExpenses = async (request: PagedRequest, topic?: Topic) => {

    const token = GetCurrentUser().accessToken;
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
    console.log("request: " + JSON.stringify(request));
    
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

export const GetExpense = async (id: number) => {
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

export default {
    GetExpensesForCurrentYear,
    GetAllExpenses,
    DeleteExpense,
    GetExpensesSumForToday,
    GetExpensesSumForMonth,
    GetExpensesSumForYear,
    GetUserExpensesByTopic,
    GetUserExpenses,
    GetPagedUserExpenses,
    GetExpense
}