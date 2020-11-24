import { Box, Container } from '@material-ui/core';
import React from 'react';
import ExpensesPerMonthLineDiagram from '../Diagrams/ExpensesPerMonthLineDiargam';
import ProfileTile from '../Tiles/ProfileTile';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <Container className="contentDiv" maxWidth="md">
                 <ProfileTile marginTop={40}>
                    <ExpensesPerMonthLineDiagram 
                    paddingTop={20} 
                    paddingBottom={20}
                    paddingLeft={40}
                    paddingRight={40}
                    />
                 </ProfileTile>
            </Container>
        </React.Fragment>
    );
}

export default StatisticPage;