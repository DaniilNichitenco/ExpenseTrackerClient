import { Box, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import ExpensesPerMonthLineDiagram from '../Diagrams/ExpensesPerMonthLineDiargam';
import ProfileTile from '../Tiles/ProfileTile';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <Container className="contentDiv" maxWidth="md">
                 <ProfileTile marginTop={40}>
                    <ExpensesPerMonthLineDiagram 
                    />
                 </ProfileTile>
            </Container>
        </React.Fragment>
    );
}

export default StatisticPage;