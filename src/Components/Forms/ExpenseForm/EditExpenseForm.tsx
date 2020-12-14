import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles, Theme, Grid, Typography, CircularProgress } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Topic from "../../../Data/Models/Topics/Topic";
import { mapToSelectItems } from "../../../mapper/mapper";
import useSessionStorage from "../../../CustomHooks/StorageHooks/useSessionStorage";
import Wallet from "../../../Data/Models/Wallets/Wallet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepickerStyles.css";
import Expense from "../../../Data/Models/Expenses/Expense";
import { getExpense, updateExpense } from "../../../Services/expense.service/ExpenseService";
import ExpenseForUpdate from "../../../Data/Models/Expenses/ExpenseForUpdate";

const validationSchema = yup.object().shape({
    title: yup.string().required("Enter title!")
        .min(3, "Title is too short!").max(15,  "Should be 15 chars maximum"),
    walletId: yup.number().required("Chose wallet!"),
    money: yup.number().required("Enter money!")
        .min(1, "Minimum value is 1!").max(9999999999, "Maximum value is 9999999999!")
  });

interface EditExpenseFormProps
{
    topic: Topic;
    expenseId: number;
    handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

export const EditExpenseForm: React.FC<EditExpenseFormProps> = (props) => {

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const classes = useStyles();
    const [items, setitems] = useState<{id: number, label: string}[]>([]);
    const [walletsData] = useSessionStorage<Wallet[]>("walletsData", []);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [result, setResult] = useState<{
        expense?:Expense,
        successed: boolean,
        description: string
    }>({successed: false, description: ""});

    useEffect(() => {
        setitems(mapToSelectItems("id", "currencyCode", walletsData));
        console.log(items);
    }, [walletsData])

    useEffect(() => {
        getResult(props.expenseId)
            .then(res => {
                if(res.successed)
                {
                    setCurrentDate(new Date(res.expense.date));
                }
                setResult(res);
                console.log(res.expense.walletId);
                console.log(walletsData);
                setIsLoading(false);
            });
    }, []);

    const getResult = async (expenseId: number) => {
        return getExpense(expenseId)
            .then(result => {
                if(result.response.status == 200)
                {
                    return{
                        expense: result.data,
                        successed: true,
                        description: "Successed"
                    }
                }
                if(result.response.status == 404)
                {
                    return{
                        successed: false,
                        description: "Expense has already deleted",
                        expense: undefined
                    };
                }
                return{
                    successed: false,
                    description: "You do not have access to this expense",
                    expense: undefined
                };
            })
            .catch(error => {
                console.log(error);

                return{
                    successed: false,
                    description: "Something went wrong",
                    expense: undefined
                };
            })
      }

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate > selectedDate;
      }
    

    const onSubmit = (formValues: ExpenseForUpdate) => {
        formValues.date = new Date(currentDate);
        formValues.id = props.expenseId;
        formValues.topicId = props.topic.id;
         
        updateExpense(formValues).then(res => {
            props.handleClose();
        })
    }

    const ExampleCustomInput = ({ value, onClick, ...rest}: any) => (
        <Button style={{fontSize:22}} onClick={onClick} variant="contained" color="primary">
          {value}
        </Button>
      );

    if(isLoading)
    {
        return(
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

    if(!result.successed || result.expense == undefined)
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
                                                defaultValue={result.expense.title}
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
                                            name="walletId" 
                                            type="number"
                                            label="Wallet"
                                            required
                                            defaultValue={result.expense.walletId.toString()}
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
                                            defaultValue={result.expense.money.toString()}
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

export default EditExpenseForm;