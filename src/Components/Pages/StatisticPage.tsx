import { Box, Container } from '@material-ui/core';
import React from 'react';
import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';

const StatisticPage:React.FC = () => {

    return(
        <React.Fragment>
            <AppbarGeneric />
            <AppContent>
                <Container className="contentDiv" maxWidth="md">
                     2
                </Container>
            </AppContent>
        </React.Fragment>
    );
}

export default StatisticPage;