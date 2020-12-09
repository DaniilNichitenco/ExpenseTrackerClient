import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import ExpensesPerDaysDiagram from '../Diagrams/ExpensesPerDaysDiagram';
import ExpensesPerMonthLineDiagram from '../Diagrams/ExpensesPerMonthLineDiargam';
import TopicPercentsDiagram from '../Diagrams/TopicPercentsDiagram';
import GridPaperHeader from '../GridPaper/GridPaperHeader';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <Container className="contentDiv" component={Grid} xs={11}>
                 <Grid container justify="center" style={{margin:0}} spacing={4}>
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
                 </Grid>
            </Container>
        </React.Fragment>
    );
}

export default StatisticPage;