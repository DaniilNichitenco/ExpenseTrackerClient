import { Grid, GridList, Button, Box, Paper, Typography, CircularProgress, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import TopicService from '../../Services/topic.services/TopicService';
import { TopicPaper } from './TopicPaper';

export const ExpensesList: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [topicsWithExpenses, setTopicsWithExpenses, 
        removeTopicsWithExpenses] = useSessionStorage<TopicWithExpenses[]>("topicsWithExpenses", []);

    useEffect(() => {

        if(topicsWithExpenses.length == 0)
        {
            TopicService.GetTopicsWithExpenses(5)
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


export default ExpensesList;