import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, DialogTitle, DialogContent, DialogActions, makeStyles, Grid, Typography, CircularProgress } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import "../ExpenseForm/datepickerStyles.css";
import TopicForCreate from "../../../Data/Models/Topics/TopicForCreate";
import { CreateTopic } from "../../../Services/topic.services/TopicService";

const validationSchema = yup.object().shape({
    name: yup.string().required("Enter topic's name!").min(3, "Should be 3 chars minimum!")
    .max(12, "Should be 12 chars maximum!"),
  });

  interface CreateTopicFormProps
  {
      handleClose: () => void
  }

  const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

  export const CreateTopicForm: React.FC<CreateTopicFormProps> = (props) => {

    const classes = useStyles();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;

    const onSubmit = async (formValues: TopicForCreate) => {
            CreateTopic(formValues)
                .then(res => {
                    props.handleClose();
                });
        }

    return(
        <React.Fragment>
            <FormProvider {...methods}>
                <DialogTitle>
                        <Grid container justify="center" xs={12}>
                            <Typography variant="h6">Creating topic</Typography>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <form noValidate className={classes.form}>
                                <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <InputForm 
                                            errorObj={errors}
                                            name="name" 
                                            type="text"
                                            label="Topic's name"
                                            required
                                            variant="outlined"
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
                            Create
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

  export default CreateTopicForm;