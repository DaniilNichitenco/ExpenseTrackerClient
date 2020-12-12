import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles, Theme, Typography } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ISignInFormProps from './ISignInFormProps';
import UserForSignIn from "../../../Data/Models/User/UserForSignIn";
import AuthService from "../../../Services/auth.services/auth-service";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object().shape({
    login: yup.string().required("Enter login!"),
    password: yup.string().required("Enter password!")
  });

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

const SignInForm: React.FC<ISignInFormProps> = (props) => {

    const classes = useStyles();
    const history = useHistory();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const [signInError, setSignInError] = useState("");

    const onSubmit: SubmitHandler<UserForSignIn> = async (formValues) => await signIn(formValues);

    const signIn = async (formValues: UserForSignIn) => {
        
        AuthService.SignIn(formValues)
            .then(response => {
                if(response.status == 200)
                {
                    props.handleClose();
                    history.push("/au/home");
                }
                else
                {
                    setSignInError("Incorrect login or password");
                }
            })
            .catch(error => {
                console.log(error);
                setSignInError("Cannot sign in, server may be down");
            });      
    }

    return(
        <FormProvider {...methods}>
            <DialogTitle id="form-dialog-title" className={classes.title}>
                Sign In
            </DialogTitle>
            <DialogContent>
            <DialogContentText className={classes.subtitle}>
                Please, fill fields to sign in
            <p style={{color:"red", fontWeight:400, fontSize:16}}>
                <Typography>
                    {signInError}
                </Typography>
            </p>
            </DialogContentText>
            <form>
                <InputForm 
                errorObj={errors}
                name="login" 
                label="Login(Username/Email)" 
                autoFocus={true} 
                required={true}
                />
                <InputForm 
                errorObj={errors}
                type="password"
                name="password" 
                label="Password" 
                required={true}
                />
            </form>
            <DialogActions className={classes.buttonContainer}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    className={classes.button}
                    >
                    Sign In
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
        </FormProvider>
    );
}

export default SignInForm;