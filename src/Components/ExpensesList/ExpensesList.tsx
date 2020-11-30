import { Grid, GridList, Button, Box, Paper, Typography, CircularProgress, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import TopicService from '../../Services/topic.services/TopicService';
import { TopicPaper } from './TopicPaper';

export const ExpensesList: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    // const [topics, setTopics, removeTopics] = useSessionStorage<Topic[]>("topics", []);
    // const [expenses, setExpenses, removeExpenses] = useSessionStorage<Expense[]>("expenses", []);
    const [topicsWithExpenses, setTopicsWithExpenses, 
        removeTopicsWithExpenses] = useSessionStorage<TopicWithExpenses[]>("topicsWithExpenses", []);

    useEffect(() => {

        if(topicsWithExpenses.length == 0)
        {
            TopicService.GetTopicsWithExpenses(10)
            .then(result => {
                if(result.response.status == 200)
                {
                    setTopicsWithExpenses(result.data);
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

    }, []);

    if(isLoading)
    {
        return(
        <Grid container xs={12} justify="center">
            <CircularProgress color="secondary" />
        </Grid>);
    }

    return(
        <GridList cellHeight={"auto"}
        cols={2} style={{width:"100%", paddingBottom:40, marginTop:20}}
        >
            {topicsWithExpenses.map((topic) => {

                return(
                    <Grid item container key={topic.id} justify="center" style={{ marginBottom: 10}}>
                        <TopicPaper topic={topic} />
                    </Grid>
                );
                })}
        </GridList>
    );
}


{/* <Grid item container key={topic.id}
justify="center" style={{ marginBottom: 10}}
>
    <Grid item xs={8} xl={7}>
        <Button style={{width:"100%", padding:0}}>
        <Paper elevation={20} style={{marginBottom:10, width:"100%"}}
        >
            <Box display="flex" p={1}
            style={{backgroundColor: "black", color:"white",
            borderRadius:"10px 10px 0 0"
        }} 
            justifyContent="center">
                <Typography>{topic.name}</Typography>
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
    </Grid>
</Grid> */}

export default ExpensesList;