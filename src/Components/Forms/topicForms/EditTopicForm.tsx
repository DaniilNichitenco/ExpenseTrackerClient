import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, makeStyles, 
    Grid, Typography, CircularProgress } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Topic from "../../../Data/Models/Topics/Topic";
import { getTopic, updateTopic } from "../../../Services/topic.services/TopicService";
import TopicForUpdate from "../../../Data/Models/Topics/TopicForUpdate";

const validationSchema = yup.object().shape({
    name: yup.string().required("Enter topic's name!").min(3, "Should be 3 chars minimum!")
    .max(12, "Should be 12 chars maximum!"),
  });

interface EditTopicFormProps
{
    topicId: number;
    handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

export const EditTopicForm: React.FC<EditTopicFormProps> = (props) => {

    const classes = useStyles();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [result, setResult] = useState<{
        topic?: Topic,
        successed: boolean,
        description: string
    }>({successed: false, description: ""});

    useEffect(() => {
        getResult(props.topicId)
            .then(res => {
                setResult(res);
                setIsLoading(false);
            })
    }, []);

    const getResult = async (topicId: number) => {
        return getTopic(topicId)
            .then(result => {
                if(result.response.status == 200)
                {
                    return{
                        topic: result.data,
                        successed: true,
                        description: "Successed"
                    }
                }
                if(result.response.status == 404)
                {
                    return{
                        successed: false,
                        description: "Topic has already deleted",
                        topic: undefined
                    };
                }
                return{
                    successed: false,
                    description: "You do not have access to this topic",
                    topic: undefined
                };
            })
            .catch(error => {
                console.log(error);

                return{
                    successed: false,
                    description: "Something went wrong",
                    topic: undefined
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

      const onSubmit = (formValues: {name: string}) => {
        const topic: TopicForUpdate = {
            name: formValues.name,
            id: props.topicId
        };
        updateTopic(topic)
            .then(res => {
                props.handleClose();
            });
      }

    if(!result.successed || result.topic == undefined)
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
                            Edit topic {result.topic.name}
                        </Typography>
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
                                defaultValue={result.topic.name}
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

export default EditTopicForm;