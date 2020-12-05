import { Box, Container, Grid, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import ExpensesPerMonthLineDiagram from '../Diagrams/ExpensesPerMonthLineDiargam';
import BarDiagram from '../Diagrams/Generic/BarDiagram';
import TopicPercentsDiagram from '../Diagrams/TopicPercentsDiagram';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <Container className="contentDiv" component={Grid} xs={11} style={{padding: 0}}>
                 <Grid container justify="center" style={{margin:0}} spacing={4}>
                    <Grid item xs={8}>
                        <Paper elevation={15}>
                            <ExpensesPerMonthLineDiagram />
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper elevation={15}>
                            <TopicPercentsDiagram />
                        </Paper>
                    </Grid>
                    <Grid item xs={11}>
                        <Paper elevation={15}>
                            <BarDiagram />
                        </Paper>
                    </Grid>
                 </Grid>
            </Container>
        </React.Fragment>
    );
}

export default StatisticPage;