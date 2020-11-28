import { Grid, GridList, Button, Box, Paper, Typography } from '@material-ui/core';
import React from 'react';

interface Expense
{
    id: number,
    title: string,
    money: number,
    topic: string
}

const topic = [
    "1", '2', '3', '4'
]


const expenses: Expense[] = [
    {
        id:1,
        title:"dsa",
        money:200,
        topic:"2"
    },
    {
        id:2,
        title:"dsa2",
        money:300,
        topic:"2"
    },
    {
        id:3,
        title:"dsaa",
        money:200,
        topic:"2"
    },
    {
        id:4,
        title:"dsad",
        money:100,
        topic:"3"
    },
    {
        id:5,
        title:"adsa",
        money:100,
        topic:"3"
    },
    {
        id:6,
        title:"dsa",
        money:200,
        topic:"4"
    },
];

export const ExpensesList: React.FC = () => {

    return(
        <GridList cellHeight={"auto"}
        cols={2} style={{width:"100%", paddingBottom:40, marginTop:20}}
        >
            {topic.map((topic) => {
                const expensesTopic = expenses.filter(e => e.topic == topic).slice(0, 6);

                return(
                        <Grid item container key={topic}
                        justify="center" style={{ marginBottom: 10}}
                        >
                            <Grid item xs={7}>
                                <Button style={{width:"100%", padding:0}}>
                                <Paper elevation={20} style={{marginBottom:10, width:"100%"}}
                                >
                                    <Box display="flex" p={1}
                                    style={{backgroundColor: "black", color:"white",
                                    borderRadius:"10px 10px 0 0"
                                }} 
                                    justifyContent="center">
                                        <Typography>{topic}</Typography>
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
                                        flexWrap="wrap"
                                        >
                                            <Typography>
                                                {expense.title}
                                            </Typography>
                                        </Box>
                                        );
                                    })}
                                </Paper>
                                </Button>
                            </Grid>
                        </Grid>
            );})}
        </GridList>
    );
}

export default ExpensesList;