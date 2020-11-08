import Appbar from '../ApplicationBar/Appbar';
import StartPost from './StartPost';
import React from 'react';
import { Button, Box} from '@material-ui/core';
import logo from '../../logo.svg';

const UnauthorizedPage: React.FC = () => {
    
    return(
        <React.Fragment>
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

export default UnauthorizedPage;