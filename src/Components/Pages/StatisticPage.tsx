import { Box, Container, Grid, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import ExpensesPerMonthLineDiagram from '../Diagrams/ExpensesPerMonthLineDiargam';
import TopicPercentsDiagram from '../Diagrams/TopicPercentsDiagram';
import FlyingGridTile from '../Tiles/FlyingGridTile';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <Container className="contentDiv" maxWidth="md">
                 <Grid container justify="center" style={{margin:40}}>
                    <Grid item xs={8}>
                        <Paper elevation={15}>
                            <ExpensesPerMonthLineDiagram />
                            <TopicPercentsDiagram />
                        </Paper>
                    </Grid>
                 </Grid>
            </Container>
        </React.Fragment>
    );
}

export default StatisticPage;