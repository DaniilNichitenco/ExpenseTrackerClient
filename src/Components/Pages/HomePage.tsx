import React, { useEffect, useState } from "react";
import { CircularProgress } from '@material-ui/core';
import WalletsDoughnutDiagram from '../Diagrams/WalletsDoughnutDiagram';
import { Grid, makeStyles, Paper, Tab, Tabs, Typography, Box } from '@material-ui/core';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Wallet from '../../Data/Models/Wallets/Wallet';
import { getCurrentUserWallets } from '../../Services/wallet.services/Wallet.service';
import { ExpenseForSum } from "../../Data/Models/Expenses/ExpenseForSum";
import { getExpensesSumForToday } from "../../Services/expense.service/ExpenseService";
import ExpensesList from "../ExpensesList/ExpensesList";
import GridPaperHeader from "../GridPaper/GridPaperHeader";
import { getDaysInMonth } from 'date-fns';

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
    const [isLoadingWallets, setIsLoadingWallets] = useState(true);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
    const [walletsData, setWalletsData] = useSessionStorage<Wallet[]>(
        "walletsData", []
        );
    const [dailyExpenseSum, setDailyExpenseSum] = useSessionStorage<ExpenseForSum[]>(
        "dailyExpenseSum", []
        );
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        getCurrentUserWallets()
                .then(result => {
                    if(result.response.status == 200)
                    {
                        setWalletsData(result.data);
                        setIsLoadingWallets(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        getExpensesSumForToday()
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

      if(isLoadingWallets || isLoadingExpenses)
      {
        return(
        <Grid container xs={12} justify="center">
            <CircularProgress color="secondary" />
        </Grid>
        );
      }
    
    return(
        <React.Fragment>
            <Grid container item
             justify="center" className="contentDiv" xs={10} xl={9}
             >
                <Grid item xs={11}>
                    <Paper elevation={12}>
                        <GridPaperHeader />
                        <Grid container justify="center" className={classes.root}>
                            {walletsData.length == 0 &&
                            <Typography variant="h4">
                                There are not any wallets
                            </Typography>
                            }
                            <Grid
                                component={Tabs}
                                item
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                {walletsData.map((wallet) => (
                                    <Grid component={Tab} item key={wallet.id} 
                                    label={
                                    <Typography variant="h5">
                                        {wallet.currencyCode.toUpperCase()}
                                    </Typography>}/>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid container item justify="center" xs={12}>
                            {walletsData.map((wallet, index) => {
                                let expense = dailyExpenseSum.find(e => 
                                    e.currencyCode == wallet.currencyCode);
                                let sum:number = 0;
                                let countDays: number = getDaysInMonth(new Date()); 
                                if(expense != undefined)
                                {
                                    sum = expense.sum;
                                }

                                let rest: number = wallet.bill / countDays - sum;
                                if(rest < 0)
                                {
                                    rest = 0;
                                }

                                return(
                                <Grid item xs={12} key={index}
                                component={TabPanel} value={value} index={index}>
                                    <WalletsDoughnutDiagram 
                                        title={"Daily expenses, wallet " + wallet.currencyCode.toUpperCase()}
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