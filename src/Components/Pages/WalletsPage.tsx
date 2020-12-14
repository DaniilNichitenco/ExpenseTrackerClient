import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import WalletForList from '../../Data/Models/Wallets/WalletForList';
import { deleteWallet, getAllCurrenciesAmount, getWalletsForList } from '../../Services/wallet.services/Wallet.service';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format } from 'date-fns';
import { CreateWalletForm } from '../Forms/WalletsForm/CreateWalletForm';
import useNonInitialEffect from '../../CustomHooks/CustomUseEffectHooks/useNonInitialEffect';
import EditWalletForm from '../Forms/WalletsForm/EditWalletForm';
import GridPaperHeader from '../GridPaper/GridPaperHeader';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      buttons: {
          width: 100
      }
}));

export const WalletsPage: React.FC = () => {

    const classes = useStyles();
    const [isLoadingWallets, setIsLoadingWallets] = useState<boolean>(true);
    const [walletsForList, setWalletsForList] = useState<WalletForList[]>([]);
    const [countCurrencies, setCountCurrencies] = useState<number>(0);
    const [isLoadingCurrencies, setIsLoadingCurrencies] = useState<boolean>(true);
    const theme = useTheme();
    const [dialog, setDialog] = useState<{
        isOpen: boolean, 
        action: "update" | "create" | "delete",
        itemId: number
    }>({isOpen: false, action: "update", itemId: 0});
    const width = useMediaQuery(theme.breakpoints.down('lg'));

    const handleOpen = (action: "update" | "create" | "delete", itemId?: number) => {
        if(itemId == undefined)
        {
            setDialog({...dialog, isOpen: true, action: action});
        }
        else
        {
            setDialog({...dialog, isOpen: true, action: action, itemId: itemId})
        }
      }

    const handleClose = () => {
        setDialog({...dialog, isOpen: false});
    }

    useEffect(() => {
        getWalletsForList()
            .then(res => {
                if(res.response.status == 200)
                {
                    setWalletsForList([...res.data]);
                    setIsLoadingWallets(false);
                }
            })
            .catch(error => {
                console.log(error);
            });;

        getAllCurrenciesAmount()
            .then(res => {
                if(res.response.status == 200)
                {
                    setCountCurrencies(res.data);
                    setIsLoadingCurrencies(false);
                }
            })
            .catch(error => {
                console.log(error);
            });;
    }, []);

    useNonInitialEffect(() => {
        if(!dialog.isOpen) //if we close nested dialog, we rerender whole component
        {
            setIsLoadingWallets(true);
            getWalletsForList()
                .then(res => {
                if(res.response.status == 200)
                {
                    setWalletsForList([...res.data]);
                    setIsLoadingWallets(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [dialog])

    const handleDeleteWallet = async (id: number) => {
        deleteWallet(id)
            .then(res => {
                handleClose();
            })
            .catch(error => {
                console.log(error);
                handleClose();
            });
    }

    if(isLoadingWallets)
    {
      return (
        <Grid container xs={12} justify="center">
          <CircularProgress color="secondary" />
        </Grid>
      );
    }

    return(
        <React.Fragment>
            <Grid container justify="center" alignItems="baseline"
            className="contentDiv" xs={10} xl={9}>
                <Grid item container xs={12} spacing={5}>
                    <Grid item container xs={12} direction="row-reverse"
                    spacing={2} alignItems="center">
                        <Grid item>
                            {isLoadingWallets || isLoadingCurrencies ? 
                            <CircularProgress color="secondary" /> :
                            <Button color="secondary" 
                            disabled={walletsForList.length >= countCurrencies} 
                            variant="outlined" onClick={() => {handleOpen("create");}}>
                                Create
                            </Button>
                            }
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Count wallets: {isLoadingWallets ?
                                <CircularProgress color="secondary" /> :
                                    walletsForList.length}/{isLoadingCurrencies ?
                                <CircularProgress color="secondary" /> :
                                    countCurrencies}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Divider variant="middle" />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justify="center" spacing={2}>
                        {isLoadingWallets ? 
                        <Grid item>
                            <CircularProgress color="secondary" />
                        </Grid> :
                        walletsForList.length == 0 ? 
                        <Grid item>
                            <Typography variant="h5">
                                There are not any wallets
                            </Typography>
                        </Grid> :
                        walletsForList.map((wallet) => {
                            return(
                                <Grid key={wallet.id} item container xs={12} justify="center">
                                    <Accordion key={wallet.id} style={{width: "100%"}}>
                                        <Grid item xs={12}>
                                            <GridPaperHeader style={{margin:0}} />
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={wallet.id + "-content"}
                                            id={wallet.id + "-header"}
                                            >
                                                <Typography className={classes.heading}>
                                                    {wallet.currencyCode.toUpperCase()}
                                                </Typography>
                                            </AccordionSummary>
                                        </Grid>
                                        <AccordionDetails>
                                            <Grid container xs={12} spacing={6}>
                                                <Grid container item xs={12}>
                                                    <Typography>
                                                        Currency code: {wallet.currencyCode.toUpperCase()}<br />
                                                        Created at: {format(
                                                                    new Date(wallet.createdAt),
                                                                    "MMMM d, yyyy"
                                                                    )}<br />
                                                        Monthly plan: {(wallet.bill).toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid spacing={3}
                                                    item container xs={12} 
                                                    direction="row-reverse">
                                                    <Grid item>
                                                        <Button variant="contained" 
                                                            color="secondary" 
                                                            onClick={() => {handleOpen("delete", wallet.id);}}
                                                            className={classes.buttons}>
                                                            <Typography>
                                                                Delete
                                                            </Typography>
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant="contained" 
                                                        color="primary" 
                                                        onClick={() => {handleOpen("update", wallet.id);}}
                                                        className={classes.buttons}>
                                                            <Typography>
                                                                Edit
                                                            </Typography>
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={dialog.isOpen} fullWidth={width}>
                {dialog.action == "create" ? 
                <CreateWalletForm handleClose={handleClose} /> :
                dialog.action == "update" ?
                <EditWalletForm walletId={dialog.itemId} handleClose={handleClose} /> :
                <React.Fragment>
                    <DialogTitle>
                        <Grid container justify="center" xs={12}>
                            <Typography variant="h6">Delete wallet?</Typography>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText>
                            <Typography>
                                Are you sure you want to delete this wallet?
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={async () => {await handleDeleteWallet(dialog.itemId);}}
                        >
                        <Typography>
                            Delete
                        </Typography>
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleClose}
                        >
                        <Typography>
                            Close
                        </Typography>
                    </Button>
                    </DialogActions>
                </React.Fragment>
                }
            </Dialog>
        </React.Fragment>
    );
}

export default WalletsPage;