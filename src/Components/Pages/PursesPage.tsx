import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PurseForList from '../../Data/Models/Purses/PurseForList';
import { DeletePurse, GetAllCurrenciesAmount, GetPursesForList } from '../../Services/purse.services/Purse.service';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetMonthName from '../../Date/MonthName';
import { CreatePurseForm } from '../Forms/PursesForm/CreatePurseForm';
import useNonInitialEffect from '../../CustomHooks/CustomUseEffectHooks/useNonInitialEffect';
import EditPurseForm from '../Forms/PursesForm/EditPurseForm';
import GridPaperHeader from '../GridPaper/GridPaperHeader';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      buttons: {
          width: 100
      }
}))

export const PursesPage: React.FC = () => {

    const classes = useStyles();
    const [isLoadingPurses, setIsLoadingPurses] = useState<boolean>(true);
    const [pursesForList, setPursesForList] = useState<PurseForList[]>([]);
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
        GetPursesForList()
            .then(res => {
                if(res.response.status == 200)
                {
                    setPursesForList([...res.data]);
                    setIsLoadingPurses(false);
                }
            });

        GetAllCurrenciesAmount()
            .then(res => {
                if(res.response.status == 200)
                {
                    setCountCurrencies(res.data);
                    setIsLoadingCurrencies(false);
                }
            });
    }, []);

    useNonInitialEffect(() => {
        if(!dialog.isOpen) //if we close nested dialog, we rerender whole component
        {
            setIsLoadingPurses(true);
            GetPursesForList()
                .then(res => {
                if(res.response.status == 200)
                {
                    setPursesForList([...res.data]);
                    setIsLoadingPurses(false);
                }
            });
        }
    }, [dialog])

    const deletePurse = async (id: number) => {
        DeletePurse(id)
            .then(res => {
                handleClose();
            })
            .catch(error => {
                console.log(error);
                handleClose();
            });
    }

    const gridPaperHeaderStyle = {
        margin: 0
    }

    if(isLoadingPurses)
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
                            {isLoadingPurses || isLoadingCurrencies ? 
                            <CircularProgress color="secondary" /> :
                            <Button color="secondary" 
                            disabled={pursesForList.length >= countCurrencies} 
                            variant="outlined" onClick={() => {handleOpen("create");}}>
                                Create
                            </Button>
                            }
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Count purses: {isLoadingPurses ?
                                <CircularProgress color="secondary" /> :
                                    pursesForList.length}/{isLoadingCurrencies ?
                                <CircularProgress color="secondary" /> :
                                    countCurrencies}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Divider variant="middle" />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justify="center" spacing={2}>
                        {isLoadingPurses ? 
                        <Grid item>
                            <CircularProgress color="secondary" />
                        </Grid> :
                        pursesForList.length == 0 ? 
                        <Grid item>
                            <Typography variant="h5">
                                There are not any purses
                            </Typography>
                        </Grid> :
                        pursesForList.map((purse) => {
                            return(
                                <Grid item container xs={12} justify="center">
                                    <Accordion key={purse.id} style={{width: "100%"}}>
                                        <Grid item xs={12}>
                                            <GridPaperHeader style={gridPaperHeaderStyle} />
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={purse.id + "-content"}
                                            id={purse.id + "-header"}
                                            >
                                                <Typography className={classes.heading}>
                                                    {purse.currencyCode.toUpperCase()}
                                                </Typography>
                                            </AccordionSummary>
                                        </Grid>
                                        <AccordionDetails>
                                            <Grid container xs={12} spacing={6}>
                                                <Grid container item xs={12}>
                                                    <Typography>
                                                        Currency code: {purse.currencyCode.toUpperCase()}<br />
                                                        Created at: {purse.createdAt.getDate()}/
                                                        {GetMonthName(purse.createdAt.getMonth())}/
                                                        {purse.createdAt.getFullYear()}<br />
                                                        Monthly plan: {(purse.bill).toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid spacing={3}
                                                    item container xs={12} 
                                                    direction="row-reverse">
                                                    <Grid item>
                                                        <Button variant="contained" 
                                                            color="secondary" 
                                                            onClick={() => {handleOpen("delete", purse.id);}}
                                                            className={classes.buttons}>
                                                            <Typography>
                                                                Delete
                                                            </Typography>
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant="contained" 
                                                        color="primary" 
                                                        onClick={() => {handleOpen("update", purse.id)}}
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
                <CreatePurseForm handleClose={handleClose} /> :
                dialog.action == "update" ?
                <EditPurseForm purseId={dialog.itemId} handleClose={handleClose} /> :
                <React.Fragment>
                    <DialogTitle>
                        <Grid container justify="center" xs={12}>
                            <Typography variant="h6">Delete purse?</Typography>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText>
                            <Typography>
                                Are you sure you want to delete this purse?
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => {deletePurse(dialog.itemId);}}
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

export default PursesPage;