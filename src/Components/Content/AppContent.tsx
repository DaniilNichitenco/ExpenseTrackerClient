import { Grid } from '@material-ui/core';
import React from 'react';
import useWindowHeight from '../../CustomHooks/WindowSizeHooks/useWindowHeight';
import './AppContentStyles.css'

const AppContent: React.FC = ({children}) => {
    const windowHeight = useWindowHeight();

    return(
        <Grid container justify="center"
        className="content" style={{minHeight: windowHeight}}>
            {children}
        </Grid>
    );
}

export default AppContent;