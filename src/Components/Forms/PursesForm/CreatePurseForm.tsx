import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, DialogTitle, DialogContent, DialogActions, makeStyles, Grid, Typography, CircularProgress } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { mapToSelectItems } from "../../../mapper/mapper";
import "react-datepicker/dist/react-datepicker.css";
import "../ExpenseForm/datepickerStyles.css";
import { CreatePurse, GetAvailableCurrencies } from "../../../Services/purse.services/Purse.service";
import PurseForCreate from "../../../Data/Models/Purses/PurseForCreate";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";

const validationSchema = yup.object().shape({
    purseId: yup.string().required("Chose purse!"),
    bill: yup.string().required("Enter monthly salary!")
        .min(1, "Minimum value is 1!").max(9999999999, "Maximum value is 9999999999!")
  });

  interface CreatePurseFormProps
  {
      handleClose: () => void
  }

  const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

  export const CreatePurseForm: React.FC<CreatePurseFormProps> = (props) => {

    const classes = useStyles();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const [items, setItems] = useState<{id: number, label: string}[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        GetAvailableCurrencies()
            .then(res => {
                if(res.response.status == 200)
                {
                    setItems([...mapToSelectItems("", "currencyCode", res.data)]);
                    setIsLoading(false);
                }
            });
    }, []);

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

    const onSubmit = async (formValues:{purseId: number, bill: number}) => {
            let currencyCode = items.find(i => i.id == formValues.purseId)?.label
            .toLowerCase() as "mdl" | "usd" | "eur";
            const purseForCreate: PurseForCreate = {
                currencyCode: currencyCode,
                bill: Number(formValues.bill)
            }
            console.log(purseForCreate);
            CreatePurse(purseForCreate)
                .then(res => {
                    console.log(res);
                    props.handleClose();
                });
        }

    return(
        <React.Fragment>
            <FormProvider {...methods}>
                <DialogTitle>
                        <Grid container justify="center" xs={12}>
                            <Typography variant="h6">Creating purse</Typography>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <form noValidate className={classes.form}>
                                <Grid container spacing={2}>
                                        <Grid item xs={7}>
                                            <InputForm 
                                            errorObj={errors}
                                            name="purseId" 
                                            type="number"
                                            label="Purse"
                                            required
                                            variant="outlined"
                                            select={{select: true, items: items, upperCase:true}}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <InputForm 
                                            errorObj={errors}
                                            name="bill" 
                                            type="number"
                                            label="Monthly salary"
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

export default CreatePurseForm;