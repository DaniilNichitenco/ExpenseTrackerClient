import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import ISignUpFormData from './FormProps/ISignUpFormData';
import InputForm from './InputForm';

const validationSchema = yup.object().shape({
    firstName: yup.string().required("Enter your first name!"),
    lastName: yup.string().required("Enter your last name!"),
    username: yup.string().required("Enter username!"),
    email: yup.string().required("Enter email address!"),
    password: yup.string().required("Enter password!"),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref("password"), ""], "Password must match!").required("Confirm password!")
});

function Copyright() {
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
      backgroundColor: theme.palette.secondary.main,
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

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const styles = useStyles();

    const onSubmit = (formValues: ISignUpFormData) => {
        console.log(formValues);
        console.log("formValues");
    }

    return(
        <Container maxWidth="sm">
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sigh up
                </Typography>
                <FormProvider {...methods}>
                    <form className={styles.form} autoComplete="on" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                            type="submit"
                            // onClick={handleSubmit(onSubmit)}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUpForm;