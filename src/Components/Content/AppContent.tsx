import { makeStyles } from '@material-ui/core';
import React from 'react';
import './AppContentStyles.css'

const AppContent: React.FC = ({children}) => {

    return(
        <div className="content">
            {children}
        </div>
    );
}

export default AppContent;