import React, { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles, Theme } from "@material-ui/core";
import InputForm from './InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ISignInFormData from './FormDatas/ISignInFormData';
import ISignInFormProps from './FormProps/ISignInFormProps';

const validationSchema = yup.object().shape({
    login: yup.string().required("Enter login!!!"),
    password: yup.string().required("Enter password!!!")
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

    const styles = useStyles();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const onSubmit = (formValues: ISignInFormData) => {
        props.signIn(formValues.login, formValues.password);
    };

    return(
        <FormProvider {...methods}>
            <DialogTitle id="form-dialog-title" className={styles.title}>
                Sign In
            </DialogTitle>
            <DialogContent>
            <DialogContentText className={styles.subtitle}>
                Please, fill fields to sign in
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
            <DialogActions className={styles.buttonContainer}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    className={styles.button}
                    >
                    Sign In
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={props.handleClose}
                    className={styles.button}
                    >
                    Cancel
                </Button>
            </DialogActions>
            </DialogContent>
        </FormProvider>
    );
}

export default SignInForm;