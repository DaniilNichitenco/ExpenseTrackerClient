import { Box, Button, List, CircularProgress, Dialog, DialogContent,
    DialogActions, DialogTitle, Grid, makeStyles, Paper, 
    Typography, DialogProps, DialogContentText, useMediaQuery, 
    useTheme, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Expense from '../../Data/Models/Expenses/Expense';
import Topic from '../../Data/Models/Topics/Topic';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import ExpenseService from '../../Services/expense.service/ExpenseService';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Purse from '../../Data/Models/Purses/Purse';
import { GetMonthName } from '../../Date/MonthName';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import PagedRequest from '../../Services/pagedRequests/PagedRequest';

const useStyles = makeStyles((theme) =>
({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  dialogPaper: {
      maxHeight: "600px",
      minHeight: "400px"
  }
}),
);


interface TopicExpensesListProps
{
    topic: Topic;
    handleClose: () => void;
}

const TopicExpensesList: React.FC<TopicExpensesListProps> = (props) => {

    const pageSize: number = 20;
    
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [hasData, setHasData] = useState<boolean>(true);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [pursesData, setPursesData, removePursesData] = useSessionStorage<Purse[]>("pursesData", []);

    const classes = useStyles();

    useEffect(() => {
        if (isLoadingData)
        {
            handleLoadMore();
        }
        console.log("useEffect state:" + isLoadingData + expenses);
      }, [isLoadingData]);
      

    const handleLoadMore = () => {
        if(hasNextPage)
        {
            setIsLoadingData(true);
            const request: PagedRequest = {
            pageIndex: pageIndex,
            pageSize: pageSize
        };

        ExpenseService.GetPagedUserExpenses(request, props.topic)
            .then(result => {
                if(result.response.status == 200)
                {
                    if(result.data.total == 0)
                    {
                        setHasData(false);
                    }
                    setExpenses([...expenses, ...result.data.items]);
                    setHasNextPage(result.data.items.length == pageSize);
                    setIsLoadingData(false);
                    setPageIndex(pageIndex + 1);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const infiniteRef = useInfiniteScroll({
        loading:isLoadingData,
        hasNextPage,
        onLoadMore: handleLoadMore,
        scrollContainer: "parent"
      });

    return(
        <React.Fragment>
            <DialogTitle id="scroll-dialog-title">
                <Grid container justify="center" xs={12}>
                    <Typography variant="h6">{props.topic.name}</Typography>
                </Grid>
            </DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description" ref={infiniteRef}
                >
                    {!hasData ?
                        <Grid container xs={12} justify="center">
                            <Typography variant="h6">
                                You do not have any {props.topic.name} expeses
                            </Typography>
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
                                    Date: {expense.date.getDate()}/
                                    {GetMonthName(expense.date.getMonth())}/
                                    {expense.date.getFullYear()}
                                    <br/>
                                    Sum: {expense.money} {currencyCode}
                                </Typography>
                                </AccordionDetails>
                            </Accordion>

                        );
                    })}
                    {isLoadingData && 
                        <Grid container xs={12} justify="center">
                            <Grid container item xs={12} justify="center">
                                <CircularProgress color="secondary" />
                            </Grid>
                            <Grid container item xs={12} justify="center">
                                <Typography variant="h6">
                                    Loading expenses...
                                </Typography>
                            </Grid>
                        </Grid>}
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

    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const classes = useStyles();
    
    const handleOpen = () => {
        setIsOpen(true);
      };

    const handleClose = () => {
        setIsOpen(false);
    }

    return(
        <Grid item xs={8} xl={7}>
                                <Button style={{width:"100%", padding:0}} onClick={handleOpen}>
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
                                        props.topic.expenses.length == 0 &&
                                        <Box display="flex" justifyContent="center"
                                        flexWrap="wrap">
                                            <Typography variant="h5">
                                                There are not any expenses
                                            </Typography>
                                        </Box>
                                    }
                                    {props.topic.expenses.map((expense) => {
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
                    <Dialog open={isOpen}
                    scroll="paper" aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth={useMediaQuery(theme.breakpoints.down('lg'))}
                    classes={{paper: classes.dialogPaper}}
                    >
                        <TopicExpensesList topic={{
                            id: props.topic.id,
                            name: props.topic.name
                        }} 
                        handleClose={handleClose}
                        />
                    </Dialog>
                </Grid>
    );
}

export default TopicPaper;