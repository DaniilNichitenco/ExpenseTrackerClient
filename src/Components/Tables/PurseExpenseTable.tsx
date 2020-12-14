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
import { getCurrentUserPurses } from '../../Services/purse.services/Purse.service';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import ExpenseForSum from '../../Data/Models/Expenses/ExpenseForSum';
import { getExpensesSumForMonth, getExpensesSumForToday, 
  getExpensesSumForYear } from '../../Services/expense.service/ExpenseService';
import clsx from 'clsx';
import { getDaysInMonth } from 'date-fns';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
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
      fontWeight: 800,
  },
  textTable: {
    fontSize: 18
  }
});

interface TableDataProps
{
    currencyCode:string
}

const TableDailyData: React.FC<TableDataProps> = ({currencyCode}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dailyExpenseSum, setDailyExpenseSum] = useSessionStorage<ExpenseForSum[] | undefined>(
      "dailyExpenseSum", undefined
      );

    let expenseForSum: number = 0;

        useEffect(() => {
            if(dailyExpenseSum == undefined)
            {
                getExpensesSumForToday()
                    .then(result => {

                        if(result.response.status == 200)
                        {
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

    if(isLoading || dailyExpenseSum == undefined)
    {
        return(
        <Grid container xs={12} justify="center">
          <CircularProgress color="secondary" />
        </Grid>
          );
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
    const [monlyExpenseSum, setMonlyExpenseSum] = useSessionStorage<ExpenseForSum[] | undefined>(
      "monlyExpenseSum", undefined
      );

    let expenseForSum: number = 0;

        useEffect(() => {
          if(monlyExpenseSum == undefined)
          {
            getExpensesSumForMonth()
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

    if(isLoading || monlyExpenseSum == undefined)
    {
        return(
          <Grid container xs={12} justify="center">
            <CircularProgress color="secondary" />
          </Grid>
          );
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
    const [yearlyExpenseSum, setYearlyExpenseSum] = useSessionStorage<ExpenseForSum[] | undefined>(
      "yearlyExpenseSum", undefined
      );

    let expenseForSum: number = 0;

        useEffect(() => {
            if(yearlyExpenseSum == undefined)
            {
                getExpensesSumForYear()
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

    if(isLoading || yearlyExpenseSum == undefined)
    {
        return(
          <Grid container xs={12} justify="center">
            <CircularProgress color="secondary" />
          </Grid>
          );
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
  const [pursesData, setPursesData] = useSessionStorage<Purse[]>("pursesData", []);

  useEffect(() => {
    
    if(pursesData == [])
    {
        getCurrentUserPurses()
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
    return (
      <Grid container xs={12} justify="center">
        <CircularProgress color="secondary" />
      </Grid>
      ); 
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" className={classes.textTable}>Purse</StyledTableCell>
            <StyledTableCell align="center" className={classes.textTable}>Daily expenses/plan</StyledTableCell>
            <StyledTableCell align="center" className={classes.textTable}>Monthly expenses/plan</StyledTableCell>
            <StyledTableCell align="center" className={classes.textTable}>Yearly expenses/plan</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pursesData.length == 0 && 
          <StyledTableRow className={classes.textTable}>
            <>
            <StyledTableCell align="center" className={classes.textTable}>
              <Typography>There are not any purses</Typography>    
            </StyledTableCell>
            <StyledTableCell align="center" className={classes.textTable}>
              <Typography>There are not any purses</Typography>    
            </StyledTableCell>
            <StyledTableCell align="center" className={classes.textTable}>
              <Typography>There are not any purses</Typography>    
            </StyledTableCell>
            <StyledTableCell align="center" className={classes.textTable}>
              <Typography>There are not any purses</Typography>    
            </StyledTableCell>
            </>
          </StyledTableRow>
          }
          {pursesData.map((purse) => (
            <StyledTableRow key={purse.id} className={classes.textTable}>
              <StyledTableCell component="th" scope="row" align="center" 
                className={clsx(classes.rowHeader, classes.textTable)}>
                {purse.currencyCode.toUpperCase()}
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.textTable}>
                <TableDailyData currencyCode={purse.currencyCode}/>/{
                  (purse.bill/getDaysInMonth(new Date())).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.textTable}>
                <TableMonthlyData currencyCode={purse.currencyCode}/>/{(purse.bill).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.textTable}>
                <TableYearlyData currencyCode={purse.currencyCode}/>/{(purse.bill*12).toFixed(2)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PurseExpenseTable;