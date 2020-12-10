import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, makeStyles, 
    Theme, Typography, CircularProgress, Grid } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import IEditProfileFormProps from './IEditProfileFormProps';
import UserForUpdate from "../../../Data/Models/User/UserForUpdate";
import { EditUser, GetCurrentUserData } from "../../../Services/user.services/User.service";
import User from "../../../Data/Models/User/User";
import useSessionStorage from "../../../CustomHooks/StorageHooks/useSessionStorage";

const validationSchema = yup.object().shape({
    firstName: yup.string().required("Enter first name!").min(3, "Minimum length is 3 characters!")
        .max(15, "maximum length is 15 characters!"),
    lastName: yup.string().required("Enter last name!").min(3, "Minimum length is 3 characters!")
        .max(15, "maximum length is 15 characters!"),
  });

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

const EditProfileForm: React.FC<IEditProfileFormProps> = (props) => {

    const classes = useStyles();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const [userData, setUserData] = useSessionStorage<User | undefined>("userData", 
    undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onSubmit: SubmitHandler<UserForUpdate> = async (formValues) => {

        EditUser(formValues)
            .then(res => {
                props.handleClose();
            });
    };

    useEffect(() => {
        if(userData == undefined)
        {
            GetCurrentUserData()
                .then(res => {
                    if(res.status == 200)
                    {
                        setUserData(res.data);
                        setIsLoading(false);
                    }
                    else
                    {
                        console.log(res.data);
                        props.handleClose();
                    }
                })
                .catch(error => {
                    console.log(error);
                    props.handleClose();
                });
        }
        else
        {
            setIsLoading(false);
        }
    }, []);

    return(
        <FormProvider {...methods}>
            <DialogTitle id="form-dialog-title">
                Editing profile
            </DialogTitle>
            <DialogContent>
            {isLoading || userData == undefined ?
            <Grid container xs={12}>
                <CircularProgress color="secondary" />
            </Grid>
            : <>
                <DialogContentText>
                    <Typography>Fill the folowing fields</Typography>
                </DialogContentText>
                <form noValidate className={classes.form}>
                    <InputForm 
                    errorObj={errors}
                    name="firstName" 
                    label="First name" 
                    autoFocus={true} 
                    required={true}
                    defaultValue={userData.firstName}
                    />
                    <InputForm 
                    errorObj={errors}
                    name="lastName" 
                    type="text"
                    label="Last name"
                    required={true}
                    defaultValue={userData.lastName}
                    />
                </form>
            </>
            }
            <DialogActions>
                <Button 
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit(onSubmit)}
                    >
                    Edit
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={props.handleClose}
                    >
                    Cancel
                </Button>
            </DialogActions>
            </DialogContent>
        </FormProvider>
    );
}

export default EditProfileForm;