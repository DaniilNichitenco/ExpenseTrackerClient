import { Typography } from '@material-ui/core';
import React from 'react';
import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import Sidebar from '../Sidebar/Sidebar';
  
const HomePage: React.FC = () => {

    return(
        <React.Fragment>
            <AppContent>
                <AppbarGeneric />
            </AppContent>
        </React.Fragment>
    );
}

export default HomePage;