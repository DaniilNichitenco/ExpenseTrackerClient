import React, { useEffect, useState } from 'react';
import PurseExpensesPerDay from '../../Data/Models/Expenses/PurseExpensesPerDay';
import CountDays from '../../Date/CountDays';
import BarDiagram from './Generic/BarDiagram';
import { GetExpensesPerDayForCurrentMonth } from '../../Services/expense.service/ExpenseService';
import { CircularProgress, Grid } from '@material-ui/core';

const randomColor = require('random-color');

export const ExpensesPerDaysDiagram: React.FC = () => {

    const [expenses, setExpenses] = useState<PurseExpensesPerDay[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        GetExpensesPerDayForCurrentMonth()
            .then(res => {
                if(res.response.status == 200)
                {
                    setExpenses([...res.data]);
                    setIsLoading(false);
                }
            });
    }, []);

    if(isLoading)
    {
        return(
            <Grid container xs={12} justify="center">
                <CircularProgress color="secondary" />
            </Grid>
        );
    }

    const getData = () => {
        let datasets: any[] = [];
        
        for(const expense of expenses)
        {
            let color = randomColor(0.99, 0.99);
            let color2 = randomColor(0.99, 0.99);
            
            let sums: number[] = [];
            
            expense.expensesPerDay.forEach(e => {
                sums.push(e.sum);
            });

            datasets.push(
                {
                    label: expense.currencyCode.toUpperCase(),
                    backgroundColor: color.rgbString(),
                    borderColor: color.rgbString(),
                    borderWidth: 1,
                    hoverBackgroundColor: color2.rgbString(),
                    hoverBorderColor: color2.rgbString(),
                    data: sums
                }
            );
        }

        const data = {
            labels: Array.from({length: CountDays()}, (_, i) => i + 1),
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