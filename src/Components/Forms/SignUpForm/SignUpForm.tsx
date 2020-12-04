import React, { useState } from 'react';
import { Box, Grid, Link, Dialog, Button, Avatar, Container, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AuthService from '../../../Services/auth.services/auth-service';
import InputForm from '../InputForm/InputForm';
import SignInForm from '../SignInForm/SignInForm';
import { useHistory } from 'react-router-dom';
import UserForSignUp from '../../../Data/Models/User/UserForSignUp';

const validationSchema = yup.object().shape({
    firstName: yup.string().required("Enter your first name!").min(2, "First name is too short!")
        .max(14, "Should be 14 chars maximum!"),
    lastName: yup.string().required("Enter your last name!").min(2, "Last name is too short!")
        .max(14, "Should be 14 chars maximum!"),
    username: yup.string().required("Enter username!").min(5, "Username is too short!")
        .max(9, "Should be 9 chars maximum!"),
    email: yup.string().required("Enter email address!").email("Not valid email!"),
    password: yup.string().required("Enter password!").min(8, "Should be 6 chars minimum!")
        .max(12, "Should be 12 chars maximum!"),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref("password"), ""], "Password must match!").required("Confirm password!")
});

const Copyright = () => {
    
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
          ExpenseTracker.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const SignIn = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <React.Fragment>
        <Button onClick={handleClickOpen} component="text">
            Already have an account? Sign in
        </Button>
        <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
            <SignInForm handleClose={handleClose} />
        </Dialog>
        </React.Fragment>
    );
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      borderRadius: 12,
      backgroundColor:"white",
      padding: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.grey[900],
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignUpForm: React.FC = () => {

    const [signUpError, setSignUpError] = useState<string>("");

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const history = useHistory();
    const { handleSubmit, errors } = methods;
    const classes = useStyles();

    const onSubmit: SubmitHandler<UserForSignUp> = async (formValues) => {

        let response = await AuthService.SignUp(formValues);

        if(response.status == 200)
        {
            history.push("/au/home");
        }
        else
        {
            setSignUpError(response.data);
        }
    }

    return(
        <Container maxWidth="sm">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <p style={{color:"red", fontWeight:400, fontSize:16}}>{signUpError}</p>
                <FormProvider {...methods}>
                    <form className={classes.form} autoComplete="on" noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <InputForm 
                            errorObj={errors}
                            name="firstName" 
                            type="text"
                            label="First name" 
                            autoFocus={true} 
                            required={true}
                            variant="outlined"
                            autoComplete="fname"
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <InputForm
                                errorObj={errors}
                                variant="outlined"
                                type="text"
                                required={true}
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <InputForm
                                errorObj={errors}
                                variant="outlined"
                                required={true}
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <InputForm
                                errorObj={errors}
                                variant="outlined"
                                required={true}
                                type="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <InputForm
                                variant="outlined"
                                errorObj={errors}
                                required={true}
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <InputForm
                                variant="outlined"
                                errorObj={errors}
                                required={true}
                                name="passwordConfirmation"
                                label="Password confirmation"
                                type="password"
                                autoComplete="current-password"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                            </Grid>
                        </Grid>
                    </form>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <SignIn />
                            </Grid>
                        </Grid>
                </FormProvider>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUpForm;