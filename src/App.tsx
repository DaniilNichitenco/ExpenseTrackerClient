import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import UnauthorizedPage from './Components/Pages/UnauthorizedPage';
import SignUpPage from './Components/Pages/SignUpPage';
import StartPage from './Components/Pages/StartPage';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <StartPage />
    </React.Fragment>
  );
}

export default App;
