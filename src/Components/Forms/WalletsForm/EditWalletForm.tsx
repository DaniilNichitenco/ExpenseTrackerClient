import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, makeStyles, 
    Grid, Typography, CircularProgress } from "@material-ui/core";
import InputForm from '../InputForm/InputForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Wallet from "../../../Data/Models/Wallets/Wallet";
import { getWallet, updateWallet } from "../../../Services/wallet.services/Wallet.service";
import WalletForUpdate from "../../../Data/Models/Wallets/WalletForUpdate";

const validationSchema = yup.object().shape({
    currencyCode: yup.string().required("Chose currency code!"),
    bill: yup.string().required("Enter money!")
        .min(1, "Minimum value is 1!").max(9999999999, "Maximum value is 9999999999!")
  });

interface EditWalletFormProps
{
    walletId: number;
    handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

export const EditWalletForm: React.FC<EditWalletFormProps> = (props) => {

    const classes = useStyles();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors } = methods;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [result, setResult] = useState<{
        wallet?:Wallet,
        successed: boolean,
        description: string
    }>({successed: false, description: ""});

    useEffect(() => {
        getResult(props.walletId)
            .then(res => {
                setResult(res);
                setIsLoading(false);
            })
    }, []);

    const getResult = async (walletId: number) => {
        return getWallet(walletId)
            .then(result => {
                if(result.response.status == 200)
                {
                    return{
                        wallet: result.data,
                        successed: true,
                        description: "Successed"
                    }
                }
                if(result.response.status == 404)
                {
                    return{
                        successed: false,
                        description: "Wallet has already deleted",
                        wallet: undefined
                    };
                }
                return{
                    successed: false,
                    description: "You do not have access to this wallet",
                    wallet: undefined
                };
            })
            .catch(error => {
                console.log(error);

                return{
                    successed: false,
                    description: "Something went wrong",
                    wallet: undefined
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

      const onSubmit = (formValues: {currencyCode: string, bill: number}) => {
        const walletForUpdate: WalletForUpdate = {
            currencyCode: formValues.currencyCode.toLocaleLowerCase() as "mdl" | "usd" | "eur",
            bill: Number(formValues.bill),
            id: props.walletId
        }
        updateWallet(walletForUpdate)
            .then(res => {
                props.handleClose();
            });
      }

    if(!result.successed || result.wallet == undefined)
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
                            Edit wallet {result.wallet.currencyCode.toUpperCase()}
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <form noValidate className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={7}>
                                <InputForm 
                                errorObj={errors}
                                name="currencyCode" 
                                type="text"
                                label="Currency code"
                                required
                                variant="outlined"
                                disabled
                                defaultValue={result.wallet.currencyCode.toUpperCase()}
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

export default EditWalletForm;