import { Box, Button, CircularProgress, Dialog, DialogContent,
    DialogActions, DialogTitle, Grid, makeStyles, Paper, 
    Typography, DialogContentText, useMediaQuery, 
    useTheme, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Expense from '../../Data/Models/Expenses/Expense';
import Topic from '../../Data/Models/Topics/Topic';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import { getPagedUserExpenses, deleteExpense } from '../../Services/expense.service/ExpenseService';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Purse from '../../Data/Models/Purses/Purse';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import PagedRequest from '../../Services/pagedRequests/PagedRequest';
import useNonInitialEffect from '../../CustomHooks/CustomUseEffectHooks/useNonInitialEffect';
import CreateExpenseForm from '../Forms/ExpenseForm/CreateExpenseForm';
import EditExpenseForm from '../Forms/ExpenseForm/EditExpenseForm';
import GridPaperHeader from '../GridPaper/GridPaperHeader';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) =>
({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  dialogPaper: {
      maxHeight: "600px",
      minHeight: "600px"
  },
  buttons:{
      width: 100
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
    const [pursesData] = useSessionStorage<Purse[]>("pursesData", []);
    

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

        getPagedUserExpenses(request, props.topic)
            .then(result => {
                if(result.response.status == 200)
                {
                    console.log(result.data);
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

      const handleDeleteExpense = async (expenseId: number) => {
        await deleteExpense(expenseId);
        handleClose();
      }

    if(dialog.isOpen && dialog.action!="delete")
    {
        if(dialog.action == "create")
        {
            return(<CreateExpenseForm topic={props.topic} handleClose={handleClose} />);
        }
        if(dialog.action == "update")
        {
            return(<EditExpenseForm topic={props.topic} 
                expenseId={dialog.itemId} handleClose={handleClose} />);
        }
    }

    return(
        <React.Fragment>
            <DialogTitle id="scroll-dialog-title">
                <Grid container direction="row-reverse">
                    <Button color="secondary" variant="outlined" onClick={() => handleOpen("create")}>
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
                        : 
                        <Grid item container xs={12} justify="center" spacing={2}>
                            {expenses.map((expense) => {
    
                            let currencyCode: string = "";
                            let purse = pursesData.find(p => p.id == expense.purseId);
                            
                            if(purse != null && purse != undefined)
                            {
                                currencyCode = purse.currencyCode.toUpperCase();
                            }
                            return(
                                <Grid item key={expense.id} container justify="center">
                                    <Accordion style={{width: "100%"}}>
                                        <Grid item xs={12}>
                                            <GridPaperHeader style={{margin: 0}} />
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={expense.id + "-content"}
                                            id={expense.id + "-header"}
                                            >
                                                <Typography className={classes.heading}>{expense.title}</Typography>
                                            </AccordionSummary>
                                        </Grid>
                                        <AccordionDetails>
                                        <Grid container xs={12}>
                                            <Grid container item xs={12}>
                                                <Typography>
                                                    Title: {expense.title}<br/>
                                                    Date: {format(new Date(),
                                                            "MMMM d, yyyy")}
                                                    <br/>
                                                    Sum: {expense.money} {currencyCode}
                                                </Typography>
                                            </Grid>
                                            <Grid spacing={3}
                                                    item container xs={12} 
                                                    direction="row-reverse">
                                                <Grid item>
                                                    <Button variant="contained" onClick={() => handleOpen("delete", expense.id)}
                                                    color="secondary" className={classes.buttons}>
                                                        <Typography>
                                                            Delete
                                                        </Typography>
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" 
                                                    color="primary" onClick={() => handleOpen("update", expense.id)}
                                                    className={classes.buttons}>
                                                        <Typography>
                                                            Edit
                                                        </Typography>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
    
                            );
                        })}     
                        </Grid>
                    }
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
            <Dialog open={dialog.isOpen && dialog.action=="delete"}>
                <DialogTitle>
                    <Typography>
                        Deleting expense
                    </Typography>
                </DialogTitle>
                <DialogContent dividers={true}>
                        <DialogContentText>
                            <Typography>
                                Are you sure you want to delete this expense?
                            </Typography>
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={async () => {await handleDeleteExpense(dialog.itemId);}}
                    >
                    <Typography>
                        Delete
                    </Typography>
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleClose}
                    >
                    <Typography>
                        Close
                    </Typography>
                </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

interface TopicPaperProps
{
    topic: TopicWithExpenses;
}

export const TopicPaper: React.FC<TopicPaperProps> = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    
    const handleOpen = () => {
        setIsOpen(true);
      };

    const handleClose = () => {
        setIsOpen(false);
        history.push("/au"); // used for rerender home page
    }

    return(
        <Grid item xs={8} xl={7}>
                                <Button style={{width:"100%", padding:0}} onClick={handleOpen}>
                                <Paper elevation={20} style={{marginBottom:10, width:"100%"}}
                                >
                                    <GridPaperHeader style={{
                                        color: "white", 
                                        padding: 7,
                                        }}>
                                        <Typography variant="h6">{props.topic.name}</Typography>
                                    </GridPaperHeader>
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