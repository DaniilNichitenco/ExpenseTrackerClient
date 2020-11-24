import Expense from '../../Data/Models/Expenses/Expense';
import ExpenseForSum from '../../Data/Models/Expenses/ExpenseForSum';
import ExpensesForYear from '../../Data/Models/Expenses/ExpensesForYear';
import API from '../Api';

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

            return expenses;
        })
        .catch(error => {
            console.log(error);
        });
}

export const GetExpensesForCurrentYear = async () => {
    
    return API.get("/expenses/year")
        .then(response => {
            let expenses:ExpensesForYear[] = response.data.expenses;
            console.log(expenses);
            
            return expenses;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        });
}

export const DeleteExpense = async (id: number) => {

    API.delete("/expenses/" + id)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}

export const UpdateExpense = async (id: number) => {

    return API.put("/expenses")
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        })
}

export const GetExpensesSumForYear = async () => {

    return API.get("/expenses/sum/year")
        .then(response => {
            console.log(response);
            const sums: ExpenseForSum[] = response.data.sums;

            return sums;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        });
}

export const GetExpensesSumForMonth = async () => {

    return API.get("/expenses/sum/month")
        .then(response => {
            console.log(response);
            const sums: ExpenseForSum[] = response.data.sums;

            return sums;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        });
}

export const GetExpensesSumForToday = async () => {

    return API.get("/expenses/sum/today")
        .then(response => {
            console.log(response);
            const sums: ExpenseForSum[] = response.data.sums;

            return sums;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        });
}

export default {
    GetExpensesForCurrentYear,
    GetAllExpenses,
    DeleteExpense,
    GetExpensesSumForToday,
    GetExpensesSumForMonth,
    GetExpensesSumForYear
}