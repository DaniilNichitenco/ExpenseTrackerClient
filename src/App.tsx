import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Box} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from './Components/ApplicationBar/Appbar';
import StartPost from './Components/HomePage/StartPost';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar />
      <main>
        <StartPost />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Box component="p" color="text.inherit">
              <Button variant="contained" color="primary" onClick={() => { console.log("das") }}>
                Hello World
            </Button>
            </Box>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
          </a>
          </header>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
