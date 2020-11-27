import { Box, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import ExpensesPerMonthLineDiagram from '../Diagrams/ExpensesPerMonthLineDiargam';
import FlyingGridTile from '../Tiles/FlyingGridTile';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <Container className="contentDiv" maxWidth="md">
                 <FlyingGridTile marginTop={40}>
                    <ExpensesPerMonthLineDiagram 
                    />
                 </FlyingGridTile>
            </Container>
        </React.Fragment>
    );
}

export default StatisticPage;