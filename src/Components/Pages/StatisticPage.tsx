import { CircularProgress, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import Purse from '../../Data/Models/Purses/Purse';
import { GetCurrentUserPurses } from '../../Services/purse.services/Purse.service';
import ExpensesPerDaysDiagram from '../Diagrams/ExpensesPerDaysDiagram';
import ExpensesPerMonthLineDiagram from '../Diagrams/ExpensesPerMonthLineDiargam';
import TopicPercentsDiagram from '../Diagrams/TopicPercentsDiagram';
import GridPaperHeader from '../GridPaper/GridPaperHeader';

const StatisticPage:React.FC = () => {

    const [pursesData, setPursesData] = useSessionStorage<Purse[]>("pursesData", []);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        GetCurrentUserPurses()
            .then(result => {
                if(result.response.status == 200)
                {
                    setPursesData(result.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <React.Fragment>
            <Container className="contentDiv" component={Grid} item xs={11}>
                 <Grid container justify="center" spacing={4}>
                    {isLoading ?
                    <Grid item container xs={12} justify="center">
                        <CircularProgress color="secondary" />
                    </Grid> :
                    pursesData.length == 0 ?
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center">
                            There are not any purses
                        </Typography>
                    </Grid> :
                    <>
                    <Grid item xs={8}>
                        <Paper elevation={15}>
                            <GridPaperHeader />
                            <ExpensesPerMonthLineDiagram />
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper elevation={15}>
                            <GridPaperHeader />
                            <TopicPercentsDiagram />
                        </Paper>
                    </Grid>
                    <Grid item xs={11}>
                        <Paper elevation={15}>
                            <GridPaperHeader />
                            <ExpensesPerDaysDiagram />
                        </Paper>
                    </Grid>
                    </>
                    }
                 </Grid>
            </Container>
        </React.Fragment>
    );
}

export default StatisticPage;