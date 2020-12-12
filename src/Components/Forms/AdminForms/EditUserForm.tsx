import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, makeStyles, 
    Grid, Typography, CircularProgress } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../../../Data/Models/User/User";
import { GetUserById, UpdateAccount } from "../../../Services/user.services/User.service";
import UserForUpdateAccount from "../../../Data/Models/User/UserForUpdateAccount";

const validationSchema = yup.object().shape({
    id: yup.string().required("Enter id!"),
    userName: yup.string().required("Enter UserName!").min(3, "Minimum length is 3 characters!")
        .max(15, "maximum length is 15 characters!"),
    firstName: yup.string().required("Enter First name!").min(3, "Minimum length is 3 characters!")
        .max(15, "maximum length is 15 characters!"),
    lastName: yup.string().required("Enter last name!").min(3, "Minimum length is 3 characters!")
        .max(15, "maximum length is 15 characters!"),
    email: yup.string().required("Enter Email!").email("Incorrect email format")
  });

interface EditUserFormProps
{
    handleClose: () => void;
    userId: number;
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

export const EditUserForm: React.FC<EditUserFormProps> = (props) => {

    const classes = useStyles();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [updateError, setUpdateError] = useState<string>("");
    const [result, setResult] = useState<{
        user?: User,
        successed: boolean,
        description: string
    }>({successed: false, description: ""});

    useEffect(() => {
        GetResult(props.userId)
            .then(res => {
                console.log(res);
                setResult(res);
                setIsLoading(false);
            })
    }, []);

    const onSubmit = (formValues: UserForUpdateAccount) => {

        formValues.id = Number(formValues.id);
        
        UpdateAccount(formValues)
            .then(res => {
                console.log(res);
                if(res.response.status == 200)
                {
                    setUpdateError("");
                    props.handleClose();
                }
                else
                {
                    console.log(res.data);
                    setUpdateError(res.data);
                }
            })
            .catch(error => {
               console.log(error);
               setUpdateError("Something went wrong. Server may be down"); 
            });
      }

    const GetResult = async (userId: number) => {
        return GetUserById(userId)
            .then(result => { 
                if(result.status == 200)
                {
                    return{
                        user: result.data,
                        successed: true,
                        description: "Successed"
                    }
                }
                if(result.status == 404)
                {
                    return{
                        successed: false,
                        description: "User has already deleted",
                        user: undefined
                    };
                }
                return{
                    successed: false,
                    description: "You do not have access to this user",
                    user: undefined
                };
            })
            .catch(error => {
                console.log(error);

                return{
                    successed: false,
                    description: "Something went wrong",
                    user: undefined
                };
            })
      }

      if(isLoading)
      {
        return (
            <React.Fragment>
                <DialogTitle id="scroll-dialog-title">
                    <Grid container justify="center" xs={12}>
                    <CircularProgress color="secondary" />
                    </Grid>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        <CircularProgress color="secondary" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={props.handleClose}
                        >
                        <Typography>
                            Close
                        </Typography>
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
      }

    if(!result.successed || result.user == undefined)
    {
        return(
            <React.Fragment>
                <DialogTitle id="scroll-dialog-title">
                    <Grid container justify="center" xs={12}>
                        <Typography variant="h6">Error!</Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        <Typography>
                            {result.description}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={props.handleClose}
                        >
                        <Typography>
                            Close
                        </Typography>
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }

    return(
        <React.Fragment>
            <FormProvider {...methods}>
                <DialogTitle id="scroll-dialog-title">
                    <Grid container justify="center" xs={12}>
                        <Typography variant="h6">
                            Edit user {result.user.userName}
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        <p style={{color:"red", fontWeight:400, fontSize:16}}>
                            <Typography>
                                {updateError}
                            </Typography>
                        </p>
                    </DialogContentText>
                    <form noValidate className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={7}>
                                <InputForm 
                                errorObj={errors}
                                name="id" 
                                type="number"
                                label="Id"
                                required
                                variant="outlined"
                                disabled
                                defaultValue={props.userId.toString()}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputForm 
                                errorObj={errors}
                                name="userName" 
                                type="text"
                                label="UserName"
                                required
                                variant="outlined"
                                defaultValue={result.user.userName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputForm 
                                errorObj={errors}
                                name="email" 
                                type="text"
                                label="Email"
                                required
                                variant="outlined"
                                defaultValue={result.user.email}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputForm 
                                errorObj={errors}
                                name="firstName" 
                                type="text"
                                label="First Name"
                                required
                                variant="outlined"
                                defaultValue={result.user.firstName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputForm 
                                errorObj={errors}
                                name="lastName" 
                                type="text"
                                label="Last Name"
                                required
                                variant="outlined"
                                defaultValue={result.user.lastName}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={handleSubmit(onSubmit)}
                        >
                        <Typography>
                            Save
                        </Typography>
                    </Button>
                        <Button 
                        variant="contained" 
                        color="primary"
                        onClick={props.handleClose}
                        >
                        <Typography>
                            Close
                        </Typography>
                    </Button>
                </DialogActions>
            </FormProvider>
        </React.Fragment>
    );
}

export default EditUserForm;