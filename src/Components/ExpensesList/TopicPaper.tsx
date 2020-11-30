import { Box, Button, CircularProgress, Dialog, DialogContent,
    DialogActions, DialogTitle, Grid, makeStyles, Paper, Typography, DialogProps, DialogContentText, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Expense from '../../Data/Models/Expenses/Expense';
import Topic from '../../Data/Models/Topics/Topic';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import ExpenseService from '../../Services/expense.service/ExpenseService';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Purse from '../../Data/Models/Purses/Purse';
import { GetMonthName } from '../../Date/MonthName';

const useStyles = makeStyles((theme) =>
({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}),
);


interface TopicExpensesListProps
{
    topic: Topic;
    handleClose: () => void;
}

const TopicExpensesList: React.FC<TopicExpensesListProps> = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [pursesData, setPursesData, removePursesData] = useSessionStorage<Purse[]>("pursesData", []);

    const classes = useStyles();

    useEffect(() => {
        ExpenseService.GetUserExpensesByTopic(props.topic)
            .then(result => {
                if(result.response.status == 200)
                {
                    setExpenses(result.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    return(
        <React.Fragment>
            <DialogTitle id="scroll-dialog-title">
                {props.topic.name}
            </DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description"
                >
                    {isLoading ? 
                        <Grid container xs={12} justify="center">
                            <CircularProgress color="secondary" />
                        </Grid>
                        : expenses.map((expense) => {

                        let currencyCode: string = "";
                        let purse = pursesData.find(p => p.id == expense.purseId);
                        
                        if(purse != null && purse != undefined)
                        {
                            currencyCode = purse.currencyCode.toUpperCase();
                        }

                        return(
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={expense.id + "-content"}
                                id={expense.id + "-header"}
                                >
                                <Typography className={classes.heading}>{expense.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    {expense.title}<br/>
                                    Date: {expense.date.getFullYear()}/
                                    {GetMonthName(expense.date.getMonth())}/
                                    {expense.date.getDate()}
                                    <br/>
                                    Sum: {expense.money} {currencyCode}
                                </Typography>
                                </AccordionDetails>
                            </Accordion>

                        );
                    })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={props.handleClose}
                    >
                    <Typography>
                        Close
                    </Typography>
                </Button>
            </DialogActions>     
        </React.Fragment>
    );
}

interface TopicPaperProps
{
    topic: TopicWithExpenses
}

export const TopicPaper: React.FC<TopicPaperProps> = (props) => {

    const [isOpenOuter, setIsOpenOuter] = useState(false);
    const theme = useTheme();
    
    const handleOpenOuter = () => {
        setIsOpenOuter(true);
      };

    const handleCloseOuter = () => {
        setIsOpenOuter(false);
    }

    const expensesTopic = props.topic.expenses.slice(0, 10);

    return(
        <Grid item xs={8} xl={7}>
                                <Button style={{width:"100%", padding:0}} onClick={handleOpenOuter}>
                                <Paper elevation={20} style={{marginBottom:10, width:"100%"}}
                                >
                                    <Box display="flex" p={1}
                                    style={{backgroundColor: "black", color:"white",
                                    borderRadius:"10px 10px 0 0"
                                }} 
                                    justifyContent="center">
                                        <Typography>{props.topic.name}</Typography>
                                    </Box>
                                    {
                                        expensesTopic.length == 0 &&
                                        <Box display="flex" justifyContent="center"
                                        flexWrap="wrap">
                                            <Typography variant="h5">
                                                There are not any expenses
                                            </Typography>
                                        </Box>
                                    }
                                    {expensesTopic.map((expense) => {
                                    return(
                                    <Box display="flex" justifyContent="center"
                                    flexWrap="wrap" key={expense.id}
                                    >
                                        <Typography>
                                            {expense.title} - {expense.money}
                                        </Typography>
                                    </Box>
                                    );
                                })}
                        </Paper>
                    </Button>
                    <Dialog open={isOpenOuter}
                    scroll="paper" aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth={useMediaQuery(theme.breakpoints.down('lg'))}
                    >
                        <TopicExpensesList topic={{
                            id: props.topic.id,
                            name: props.topic.name
                        }} 
                        handleClose={handleCloseOuter}
                        />
                    </Dialog>
                </Grid>
    );
}

export default TopicPaper;