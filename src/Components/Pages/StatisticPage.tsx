import { Box, Container } from '@material-ui/core';
import React from 'react';
import AppContent from '../Content/AppContent';
import ExpensesLineDiagram from '../Diagrams/ExpensesLineDiargam';
import AppbarGeneric from '../Generics/AppbarGeneric';
import ProfileTile from '../Tiles/ProfileTile';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <Container className="contentDiv" maxWidth="md">
                 <ProfileTile marginTop={40}>
                    <ExpensesLineDiagram 
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