import React, { useEffect, useState } from 'react';
import PurseExpensesPerDay from '../../Data/Models/Expenses/WalletExpensesPerDay';
import BarDiagram from './Generic/BarDiagram';
import { getExpensesPerDayForCurrentMonth } from '../../Services/expense.service/ExpenseService';
import { CircularProgress, Grid } from '@material-ui/core';
import { getColor } from '../../Colors/colors';
import { getDaysInMonth } from 'date-fns'

export const ExpensesPerDaysDiagram: React.FC = () => {

    const [expenses, setExpenses] = useState<PurseExpensesPerDay[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getExpensesPerDayForCurrentMonth()
            .then(res => {
                if(res.response.status == 200)
                {
                    setExpenses([...res.data]);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    if(isLoading)
    {
        return(
            <Grid container justify="center">
                <CircularProgress color="secondary" />
            </Grid>
        );
    }

    const getData = () => {
        let datasets: any[] = [];
        
        expenses.forEach((expense, index) => {
            let color = getColor(index);
            
            let sums: number[] = [];
            
            expense.expensesPerDay.forEach(e => {
                sums.push(e.sum);
            });

            datasets.push(
                {
                    label: expense.currencyCode.toUpperCase(),
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                    hoverBackgroundColor: color,
                    hoverBorderColor: color,
                    data: sums
                }
            );
        });

        const data = {
            labels: Array.from({length: getDaysInMonth(new Date())}, (_, i) => i + 1),
            datasets: datasets
        };

        return data;
    }

    

    return(
        <BarDiagram data={getData()} title={{
            display: true,
            text: "Expenses for current month",
            fontSize: 20
        }} legend={{
            display: true,
            position: "right"
        }} />
    );
}

export default ExpensesPerDaysDiagram;