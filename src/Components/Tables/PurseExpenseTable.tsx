import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Purse from '../../Data/Models/Purses/Purse';
import { PursesDefault } from '../../Data/Models/Purses/default/PurseDefault';
import PursesService from '../../Services/purse.services/Purse.service';
import { CircularProgress } from '@material-ui/core';
import { ExpensesForSumDefault } from '../../Data/Models/Expenses/default/ExpenseForSumDefault';
import ExpenseForSum from '../../Data/Models/Expenses/ExpenseForSum';
import ExpenseService from '../../Services/expense.service/ExpenseService';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  rowHeader: {
      fontWeight: 600,
  }
});

interface TableDataProps
{
    currencyCode:string
}

const TableDailyData: React.FC<TableDataProps> = ({currencyCode}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dailyExpenseSum, setDailyExpenseSum, 
        removeDailyExpenseSum] = useSessionStorage<ExpenseForSum[]>("dailyExpenseSum", ExpensesForSumDefault);

    let expenseForSum: number = 0;

        useEffect(() => {
            if(dailyExpenseSum == ExpensesForSumDefault)
            {
                ExpenseService.GetExpensesSumForToday()
                    .then(result => {

                        if(result.response.status == 200)
                        {
                            console.log(result.data);
                            setDailyExpenseSum(result.data);
                            setIsLoading(false);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else
            {
                setIsLoading(false);
            }
        });

    if(isLoading)
    {
        return(<CircularProgress color="secondary" />);
    }

    let sum = dailyExpenseSum.find(e => e.currencyCode == currencyCode);

    if(sum != undefined)
    {
        expenseForSum = sum.sum;
    }

    return (<>{expenseForSum}</>);
}

const TableMonthlyData: React.FC<TableDataProps> = ({currencyCode}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [monlyExpenseSum, setMonlyExpenseSum, 
        removeMonlyExpenseSum] = useSessionStorage<ExpenseForSum[]>("monlyExpenseSum", ExpensesForSumDefault);

    let expenseForSum: number = 0;

        useEffect(() => {
            if(monlyExpenseSum == ExpensesForSumDefault)
            {
                ExpenseService.GetExpensesSumForMonth()
                    .then(result => {

                        if(result.response.status == 200)
                        {
                            setMonlyExpenseSum(result.data);
                            setIsLoading(false);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else
            {
                setIsLoading(false);
            }
        });

    if(isLoading)
    {
        return(<CircularProgress color="secondary" />);
    }

    let sum = monlyExpenseSum.find(e => e.currencyCode == currencyCode);

    if(sum != undefined)
    {
        expenseForSum = sum.sum;
    }

    return (<>{expenseForSum}</>);
}

const TableYearlyData: React.FC<TableDataProps> = ({currencyCode}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [yearlyExpenseSum, setYearlyExpenseSum, 
        removeYearlyExpenseSum] = useSessionStorage<ExpenseForSum[]>("yearlyExpenseSum", ExpensesForSumDefault);

    let expenseForSum: number = 0;

        useEffect(() => {
            if(yearlyExpenseSum == ExpensesForSumDefault)
            {
                ExpenseService.GetExpensesSumForYear()
                    .then(result => {

                        if(result.response.status == 200)
                        {
                            setYearlyExpenseSum(result.data);
                            setIsLoading(false);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else
            {
                setIsLoading(false);
            }
        });

    if(isLoading)
    {
        return(<CircularProgress color="secondary" />);
    }

    let sum = yearlyExpenseSum.find(e => e.currencyCode == currencyCode);

    if(sum != undefined)
    {
        expenseForSum = sum.sum;
    }

    return (<>{expenseForSum}</>);
}

const PurseExpenseTable:React.FC = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [pursesData, setPursesData, removePursesData] = useSessionStorage<Purse[]>("pursesData", PursesDefault);

  useEffect(() => {
    
    if(pursesData == PursesDefault)
    {
        PursesService.GetCurrentUserPurses()
            .then(result => {
                if(result.response.status == 200)
                {
                    setPursesData(result.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    else
    {
        setIsLoading(false);
    }
    
  }, []);

  if(isLoading)
  {
    return (<CircularProgress color="secondary" />); 
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Purse</StyledTableCell>
            <StyledTableCell align="center">Daily expenses/plan</StyledTableCell>
            <StyledTableCell align="center">Monthly expenses/plan</StyledTableCell>
            <StyledTableCell align="center">Yearly expenses/plan</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pursesData.map((purse) => (
            <StyledTableRow key={purse.id}>
              <StyledTableCell component="th" scope="row" align="center" className={classes.rowHeader}>
                {purse.currencyCode.toUpperCase()}
              </StyledTableCell>
              <StyledTableCell align="center"><TableDailyData currencyCode={purse.currencyCode}/>/{purse.bill/30}</StyledTableCell>
              <StyledTableCell align="center"><TableMonthlyData currencyCode={purse.currencyCode}/>/{purse.bill}</StyledTableCell>
              <StyledTableCell align="center"><TableYearlyData currencyCode={purse.currencyCode}/>/{purse.bill*12}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PurseExpenseTable;