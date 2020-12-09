import React, { useEffect, useState } from "react";
import { CircularProgress } from '@material-ui/core';
import PursesDoughnutDiagram from '../Diagrams/PursesDoughnutDiagram';
import { Grid, makeStyles, Paper, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { PursesDefault } from '../../Data/Models/Purses/default/PurseDefault';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Purse from '../../Data/Models/Purses/Purse';
import { GetCurrentUserPurses } from '../../Services/purse.services/Purse.service';
import { ExpensesForSumDefault } from "../../Data/Models/Expenses/default/ExpenseForSumDefault";
import { ExpenseForSum } from "../../Data/Models/Expenses/ExpenseForSum";
import { GetExpensesSumForToday } from "../../Services/expense.service/ExpenseService";
import { CountDays } from "../../Date/CountDays";
import ExpensesList from "../ExpensesList/ExpensesList";
import { GetCurrentUser } from "../../Services/auth.services/auth-service";
import GridPaperHeader from "../GridPaper/GridPaperHeader";

interface TabPanelProps {
    index: number,
    value: number,
  }
  
  const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0} m={4}>
              {children}
          </Box>
        )}
      </div>
    );
  }  

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      widht: "fit-content"
    },
  });
  
const HomePage: React.FC = () => {

    const classes = useStyles();
    const [isLoadingPurses, setIsLoadingPurses] = useState(true);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
    const [pursesData, setPursesData, removePursesData] = useSessionStorage<Purse[]>("pursesData", PursesDefault);
    const [dailyExpenseSum, setDailyExpenseSum, 
        removeDailyExpenseSum] = useSessionStorage<ExpenseForSum[]>("dailyExpenseSum", ExpensesForSumDefault);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        
        GetCurrentUserPurses()
                .then(result => {
                    if(result.response.status == 200)
                    {
                        setPursesData(result.data);
                        setIsLoadingPurses(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        GetExpensesSumForToday()
                .then(result => {

                    if(result.response.status == 200)
                    {
                        setDailyExpenseSum(result.data);
                        setIsLoadingExpenses(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        
      }, []);

      if(isLoadingPurses || isLoadingExpenses)
      {
        return(
        <Grid container xs={12} justify="center">
            <CircularProgress color="secondary" />
        </Grid>
        );
      }
    
    return(
        <React.Fragment>
            <Grid container
             justify="center" className="contentDiv" xs={10} xl={9}
             >
                <Grid item xs={11} justify="center">
                    <Paper elevation={12} style={{paddingTop: 10}}>
                        <GridPaperHeader />
                        <Grid container justify="center" xs={12} className={classes.root}>
                            <Grid
                                component={Tabs}
                                item
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                {pursesData.map((purse) => (
                                    <Grid component={Tab} item key={purse.id} 
                                    label={
                                    <Typography variant="h5">
                                        {purse.currencyCode.toUpperCase()}
                                    </Typography>}/>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid container item justify="center" xs={12}>
                            {pursesData.map((purse, index) => {
                                let expense = dailyExpenseSum.find(e => 
                                    e.currencyCode == purse.currencyCode);
                                let sum:number = 0;
                                let countDays: number = CountDays(); 
                                if(expense != undefined)
                                {
                                    sum = expense.sum;
                                }

                                let rest: number = purse.bill / countDays - sum;
                                if(rest < 0)
                                {
                                    rest = 0;
                                }

                                return(
                                <Grid item xs={12}
                                component={TabPanel} value={value} index={index}>
                                    <PursesDoughnutDiagram 
                                        title={"Daily expenses, purse " + purse.currencyCode.toUpperCase()}
                                        labels={["Remaining money", "Daily expenses" ]}
                                        data={[Number((rest).toFixed(2)), Number((sum).toFixed(2))]}                        
                                    />
                                </Grid>
                                )})}
                        </Grid>
                    </Paper>
                </Grid>
                <ExpensesList />
            </Grid>
        </React.Fragment>
    );
}

export default HomePage;