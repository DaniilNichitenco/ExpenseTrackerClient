import React from 'react';
import StartPost from '../StartPost';
import AppbarGeneric from '../Generics/AppbarGeneric';
import SignUpButton from '../Buttons/SignUpButton';
import SignInButton from '../Buttons/SignInButton';
import { Button, Box} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../logo.svg';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';

const UnauthorizedPage: React.FC = () => {
    
    return(
        <React.Fragment>
            <AppbarGeneric rightButtons={<><SignInButton /><SignUpButton /></>} 
    leftMenu={<CreditCardRoundedIcon />} title="Expense Tracker Web Application"/>
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