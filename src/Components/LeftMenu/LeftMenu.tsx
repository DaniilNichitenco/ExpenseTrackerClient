import React from 'react';
import Navigator from './NavigationBar';

import { makeStyles } from '@material-ui/core/styles';


  
  const drawerWidth = 256;
  
  const styles = makeStyles( (theme) => ({
    root: {
      display: 'flex',
      minHeight: '100vh',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    app: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: 1,
      padding: theme.spacing(6, 4),
      background: '#eaeff1',
    }
  }));


  const LeftMenu: React.FC = () => {

    return(
        <Navigator PaperProps={{ style: { width: drawerWidth } }} />
    );
  }

  export default LeftMenu;