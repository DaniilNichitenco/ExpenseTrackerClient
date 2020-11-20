import React from "react";
import { Button, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles, Theme } from "@material-ui/core";
import ISignOutFormProps from './ISignOutFormProps';
import AuthService from '../../../Services/auth.services/auth-service';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        alignSelf: "center",
        color: "black"
    },
    subtitle: {
        color: "black"
    },
    buttonContainer: {
        justifyContent: "center",
        marginTop: 30
    },
    button: {
        marginLeft:50,
        marginRight:50
    }
}));

const SignOutForm: React.FC<ISignOutFormProps> = (props) => {

    const classes = useStyles();
    const history = useHistory();

    const SignOut = () => {
        AuthService.SignOut();
        props.handleClose();
        history.push("/");
    }

    return(
        <React.Fragment>
            <DialogTitle id="form-dialog-title" className={classes.title}>
                Sign out?
            </DialogTitle>
            <DialogContent>
            <DialogContentText className={classes.subtitle}>
                Are you sure you want to sign out?
            </DialogContentText>
            <DialogActions className={classes.buttonContainer}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={SignOut}
                    className={classes.button}
                    >
                    Sign Out
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={props.handleClose}
                    className={classes.button}
                    >
                    Cancel
                </Button>
            </DialogActions>
            </DialogContent>
        </React.Fragment>
    );
}

export default SignOutForm;