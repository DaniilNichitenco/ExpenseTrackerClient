import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles, Theme, Grid, Typography } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Topic from "../../../Data/Models/Topics/Topic";
import { mapToSelectItems } from "../../../mapper/mapper";
import useSessionStorage from "../../../CustomHooks/StorageHooks/useSessionStorage";
import Purse from "../../../Data/Models/Purses/Purse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpenseForCreate from "../../../Data/Models/Expenses/ExpenseForCreate";
import "./datepickerStyles.css";
import { CreateExpense } from "../../../Services/expense.service/ExpenseService";

const validationSchema = yup.object().shape({
    title: yup.string().required("Enter title!")
        .min(3, "Title is too short!").max(15,  "Should be 15 chars maximum"),
    purse: yup.string().required("Chose purse!"),
    money: yup.number().required("Enter money!")
        .min(1, "Minimum value is 1!").max(9999999999, "Maximum value is 9999999999!")
  });

interface CreateExpenseFormProps
{
    topic: Topic;
    handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

export const CreateExpenseForm: React.FC<CreateExpenseFormProps> = (props) => {

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const classes = useStyles();
    const [items, setitems] = useState<{id: number, label: string}[]>([]);
    const [pursesData, setPursesData, removePursesData] = useSessionStorage<Purse[]>("pursesData", []);

    useEffect(() => {
        setitems(mapToSelectItems("id", "currencyCode", pursesData));
        console.log(items);
    }, [pursesData])

    const [currentDate, setCurrentDate] = useState(new Date());

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate > selectedDate;
      }
    

    const onSubmit = (formValues: ExpenseForCreate) => {
        formValues.date = new Date(currentDate);
        
        CreateExpense(formValues).then(res => {
            console.log(res);
            props.handleClose();
        });
    }

    const ExampleCustomInput = ({ value, onClick, ...rest}: any) => (
        <Button style={{fontSize:22}} onClick={onClick} variant="contained" color="primary">
          {value}
        </Button>
      );

    return(
        <React.Fragment>
            <FormProvider {...methods}>
            <DialogTitle id="scroll-dialog-title">
                <Grid container justify="center" xs={12}>
                    <Typography variant="h6">{props.topic.name}</Typography>
                </Grid>
            </DialogTitle>
            <DialogContent dividers={true}>
                        <DialogContentText>
                            <Typography>
                                Creating expense
                            </Typography>
                        </DialogContentText>
                            <form noValidate className={classes.form}>
                                <Grid container spacing={2}>
                                        <Grid item xs={5}>
                                                <InputForm 
                                                errorObj={errors}
                                                name="title" 
                                                type="text"
                                                label="Title" 
                                                autoFocus 
                                                required
                                                variant="outlined"
                                                />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <InputForm
                                                errorObj={errors}
                                                variant="outlined"
                                                type="text"
                                                required
                                                label="Topic"
                                                name="topic"
                                                defaultValue={props.topic.name}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <InputForm 
                                            errorObj={errors}
                                            name="purse" 
                                            type="text"
                                            label="Purse"
                                            required
                                            variant="outlined"
                                            select={{select: true, items: items, upperCase:true}}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <InputForm 
                                            errorObj={errors}
                                            name="money" 
                                            type="number"
                                            label="Money"
                                            required
                                            variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <DatePicker
                                            selected={currentDate}
                                            onChange={(date: Date) => setCurrentDate(date)}
                                            showTimeSelect
                                            filterDate={filterPassedTime}
                                            name="date"
                                            customInput={<ExampleCustomInput/>}
                                            />
                                        </Grid> 
                                    </Grid>
                                </form>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            variant="contained" 
                            color="primary"
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

export default CreateExpenseForm;