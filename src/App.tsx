import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom";
import Sidebar from './Components/Sidebar/Sidebar';
import HomePage from './Components/Pages/HomePage';
import SignUpPage from './Components/Pages/SignUpPage';
import UnauthorizedPage from './Components/Pages/UnauthorizedPage';
import LeftMenu from './Components/LeftMenu/LeftMenu';
import ProfilePage from './Components/Pages/ProfilePage';
import {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import UserData from './Data/UserData';
import PurseData from './Data/PurseData';
import PursesData from './Data/PursesData';
import UserContext from './Context/UserContext';

const App: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <LeftMenu />
          <div style={{paddingLeft: 256, marginTop:0}}>
            <Switch>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/home/profile">
                <ProfilePage />
              </Route>
              <Route exact path="/registration">
                <SignUpPage />
              </Route>
              <Route exact path="/">
                <UnauthorizedPage />
              </Route>
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    </ThemeProvider>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2E41FE',
      main: '#2E41FE',
      dark: '#10228A',
    },
    success: {
      main: '#2E41FE',
    },
    type: 'light',
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

export default App;
