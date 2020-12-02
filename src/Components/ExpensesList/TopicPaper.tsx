import { Box, Button, List, CircularProgress, Dialog, DialogContent,
    DialogActions, DialogTitle, Grid, makeStyles, Paper, 
    Typography, DialogProps, DialogContentText, useMediaQuery, 
    useTheme, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Expense from '../../Data/Models/Expenses/Expense';
import Topic from '../../Data/Models/Topics/Topic';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import ExpenseService, { DeleteExpense } from '../../Services/expense.service/ExpenseService';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Purse from '../../Data/Models/Purses/Purse';
import { GetMonthName } from '../../Date/MonthName';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import PagedRequest from '../../Services/pagedRequests/PagedRequest';
import useNonInitialEffect from '../../CustomHooks/CustomUseEffectHooks/useNonInitialEffect';
import CreateExpenseForm from '../Forms/ExpenseForm/CreateExpenseForm';

const useStyles = makeStyles((theme) =>
({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  dialogPaper: {
      maxHeight: "600px",
      minHeight: "600px"
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

    const [dialog, setDialog] = useState<{
        isOpen: boolean, 
        action: "update" | "create" | "delete",
        itemId: number
    }>({isOpen: false, action: "update", itemId: 0});

    const classes = useStyles();

    useNonInitialEffect(() => {
        if(!dialog.isOpen) //if we close nested dialog, we rerender whole component
        {
            setPageIndex(0);
            setHasData(true);
            setIsLoadingData(true);
            setHasNextPage(true);
            setExpenses([...[]]);
        }
    }, [dialog]);

    useEffect(() => {
        if (isLoadingData)
        {
            handleLoadMore();
        }
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

      const handleClose = () => {
          setDialog({...dialog, isOpen: false});
      }
      
      const handleOpen = (action: "update" | "create" | "delete", itemId?: number) => {
        if(itemId == undefined)
        {
            setDialog({...dialog, isOpen: true, action: action});
        }
        else
        {
            setDialog({...dialog, isOpen: true, action: action, itemId: itemId})
        }
      }

      const GetExpense = async (expenseId: number) => {
        return ExpenseService.GetExpense(expenseId)
            .then(result => {
                if(result.response.status == 200)
                {
                    return{
                        expense: result.data,
                        successed: true,
                        description: "Successed"
                    }
                }
                if(result.response.status == 404)
                {
                    return{
                        successed: false,
                        description: "Expense has already deleted"
                    };
                }
                return{
                    successed: false,
                    description: "You do not have access to this expense"
                };
            })
            .catch(error => {
                console.log(error);

                return{
                    successed: false,
                    description: "Something went wrong"
                };
            })
      }

    if(dialog.isOpen)
    {
        if(dialog.action == "create")
        {
            return(<CreateExpenseForm topic={props.topic} handleClose={handleClose} />);
        }

        setDialog({...dialog, isOpen: false});

        // let result: {
        //     expense?: Expense;
        //     successed: boolean;
        //     description: string;
        // } = {
        //     successed: false,
        //     description: ""
        // }

        // GetExpense(dialog.itemId).then(response => {
        //     result = response;
        // });

        // if(!result.successed || result.expense == undefined)
        // {
        //     return(
        //         <React.Fragment>
        //             <DialogTitle id="scroll-dialog-title">
        //                 <Grid container justify="center" xs={12}>
        //                     <Typography variant="h6">Error!</Typography>
        //                 </Grid>
        //             </DialogTitle>
        //             <DialogContent dividers={true}>
        //                 <DialogContentText>
        //                     <Typography>
        //                         {result.description}
        //                     </Typography>
        //                 </DialogContentText>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Button 
        //                     variant="contained" 
        //                     color="primary"
        //                     onClick={handleClose}
        //                     >
        //                     <Typography>
        //                         Close
        //                     </Typography>
        //                 </Button>
        //             </DialogActions>
        //         </React.Fragment>
        //     );
        // }

        // if(dialog.action == "delete")
        // {
        //     return(
        //         <React.Fragment>
        //             <DialogTitle id="scroll-dialog-title">
        //                 <Grid container justify="center" xs={12}>
        //                     <Typography variant="h6">{result.expense.title}</Typography>
        //                 </Grid>
        //             </DialogTitle>
        //             <DialogContent dividers={true}>
        //                 <DialogContentText>
        //                     <Typography>
        //                         Are you sure you want to delete this expense?
        //                     </Typography>
        //                 </DialogContentText>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Button 
        //                     variant="contained" 
        //                     color="primary"
        //                     onClick={() => {DeleteExpense(dialog.itemId).then(result => {
        //                         console.log(JSON.stringify(result));
        //                         handleClose();
        //                         }
        //                         );}}
        //                     >
        //                     <Typography>
        //                         Delete
        //                     </Typography>
        //                 </Button>
        //                 <Button 
        //                     variant="contained" 
        //                     color="primary"
        //                     onClick={handleClose}
        //                     >
        //                     <Typography>
        //                         Cancel
        //                     </Typography>
        //                 </Button>
        //             </DialogActions>
        //         </React.Fragment>
        //     );
        // }

        // return(
        //     <React.Fragment>
        //         <DialogTitle id="scroll-dialog-title">
        //             <Grid container justify="center" xs={12}>
        //                 <Typography variant="h6">{props.topic.name}</Typography>
        //             </Grid>
        //         </DialogTitle>
        //         <DialogContent dividers={true}>
        //             <DialogContentText>

        //             </DialogContentText>
        //         </DialogContent>
        //         <DialogActions>
        //             <Button 
        //                 variant="contained" 
        //                 color="primary"
        //                 onClick={handleClose}
        //                 >
        //                 <Typography>
        //                     Cancel
        //                 </Typography>
        //             </Button>
        //             <Button 
        //                 variant="contained" 
        //                 color="primary"
        //                 onClick={handleClose}
        //                 >
        //                 <Typography>
        //                     Cancel
        //                 </Typography>
        //             </Button>
        //         </DialogActions>
        //     </React.Fragment>
        // );
    }

    return(
        <React.Fragment>
            <DialogTitle id="scroll-dialog-title">
                <Grid container>
                    <Button color="inherit" variant="outlined" onClick={() => handleOpen("create")}>
                        Create
                    </Button>
                </Grid>
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