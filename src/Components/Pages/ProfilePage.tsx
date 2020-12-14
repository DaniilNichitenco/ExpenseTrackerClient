import { Grid, makeStyles, Typography, Divider, 
    Dialog } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './PageStyles.css';
import FlyingGridTile from '../Tiles/FlyingGridTile';
import { CircularProgress } from '@material-ui/core';
import User from '../../Data/Models/User/User';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import WalletExpenseTable from '../Tables/WalletExpenseTable';
import Wallet from '../../Data/Models/Wallets/Wallet';
import EditProfileButton from '../Buttons/EditProfileButton';
import { getCountUserExpenses } from '../../Services/expense.service/ExpenseService';
import { getCurrentUserData } from '../../Services/user.services/User.service';
import ExpenseForSum from '../../Data/Models/Expenses/ExpenseForSum';
import EditProfileForm from '../Forms/EditProfileForm/EditProfileForm';
import { useHistory } from 'react-router-dom';
import { getCurrentUserWallets } from '../../Services/wallet.services/Wallet.service';

const useStyles = makeStyles((theme) => ({
    contentList: {
        justifyContent:"center",
        overflowX: "hidden",
        height: "fit-content",
        padding: 20
    },
    tile: {
        border: "1px solid black"
    },
    paperTile: {
        borderRadius: "15px 15px 7px 7px",
        height: "fit-content",
        width: 300,
        backgroundColor: '#A0ABEF'
      },
      userStatusText: {
          fontFamily: "Lucida Bright"
      },
      nameText: {
          fontFamily: "Candara",
          fontSize: "inherit",
          fontWeight: "inherit"
      },
      profileHeader: {
        marginBottom:10,
        color: theme.palette.primary.dark
    },
    buttonSetting: {
        margin: 5
    },
    name: {
        color: theme.palette.primary.dark,
        marginBottom: 15,
    },
    subInfo: {
        color: theme.palette.primary.dark,
    }
}));

const ProfilePage: React.FC = () => {

    const [userData, setUserData] = useSessionStorage<User | undefined>("userData", 
    undefined);
    const classes = useStyles();
    const [isLoadingWallets, setIsLoadingWallets] = useState(true);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
    const [WalletsData, setWalletsData] = useSessionStorage<Wallet[]>("WalletsData", []);
    const [countExpenses, setCountExpenses] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [rerender, setRerender] = useState<boolean>(true);
    const [dailyExpenseSum, setDailyExpenseSum , removeDailyExpenseSum] = useSessionStorage<ExpenseForSum[]>(
        "dailyExpenseSum", []
        );
    const [monlyExpenseSum, setMonlyExpenseSum, removeMonthlyExpenseSum] = useSessionStorage<ExpenseForSum[]>(
        "monlyExpenseSum", []
        );
    const [yearlyExpenseSum, setYearlyExpenseSum, removeYearlyExpenseSum] = useSessionStorage<ExpenseForSum[]>(
        "yearlyExpenseSum", []
        );

    const history = useHistory();


    useEffect(() => {
        if(rerender)
        {
            removeDailyExpenseSum();
            removeMonthlyExpenseSum();
            removeYearlyExpenseSum();
            getCountUserExpenses().then(res => {
                if(res.response.status == 200)
                {
                    setCountExpenses(res.data);
                    setIsLoadingExpenses(false);
                }
            });
            getCurrentUserWallets()
                .then(result => {
                    if(result.response.status == 200)
                    {
                        setWalletsData(result.data);
                        setIsLoadingWallets(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            getCurrentUserData()
                .then(res => {
                    if(res.status == 200)
                    {
                        setUserData(res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        setRerender(false);
    }, [rerender]);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setRerender(true);
        setIsOpen(false);
        history.push("/au/profile");
    }

    return(
        <React.Fragment> 
            <Grid container justify="center" className="contentDiv" xs={10} xl={9}>
                <Grid item xs={10} className={classes.profileHeader}>
                    <Typography variant="h4">
                        User profile
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>
                <Grid xs={12} container className={classes.contentList}>
                    <FlyingGridTile xl={10} xs={11} paddingBottom={16}>
                        <Grid spacing={3} style={{height:"fit-content",
                            justifyContent: "center",}} container>
                            <Grid container item xs={12} className="boxAvatar">
                                    <Grid xs={12} container direction="row-reverse">
                                        <EditProfileButton onClick={handleOpen}
                                        style={{margin: 5}} />
                                    </Grid>
                                    <Grid item xs={12} style={{height: 170}} />
                            </Grid>
                            <Grid item xs={12} className={classes.name}>
                                <Typography variant="h4"
                                align="center" style={{fontWeight:600}} >
                                    {userData == undefined ? <CircularProgress color="secondary" />
                                    : <>{userData.firstName} {userData.lastName}</>
                                    }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.subInfo}>
                                <Typography align="center" variant="h6">
                                    {userData == undefined ? <CircularProgress color="secondary" />
                                    : <><b>Email:</b> {userData.email}</>
                                    }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.subInfo}>
                                <Typography align="center" variant="h6">
                                    {userData == undefined ? <CircularProgress color="secondary" />
                                    : <><b>UserName:</b> {userData.userName}</>
                                    }
                                </Typography>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid justify="space-between" container item xs={11}>
                                <Grid item className={classes.subInfo}>
                                    <Typography>
                                        {
                                            isLoadingWallets ? (<CircularProgress color="secondary" />) :
                                                <><b>Count Wallets:</b><br/>{WalletsData.length}</>
                                        }    
                                        </Typography>
                                </Grid>
                                <Grid item className={classes.subInfo}>
                                    <Typography>
                                        {
                                            isLoadingExpenses ? (<CircularProgress color="secondary" />) : 
                                            <><b>Count expenses:</b><br/>{countExpenses}</>
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FlyingGridTile>
                    <FlyingGridTile xl={10} xs={11}>
                        <WalletExpenseTable />
                    </FlyingGridTile>
                </Grid>
                <Dialog open={isOpen}>
                    <EditProfileForm handleClose={handleClose} />
                </Dialog>
            </Grid>
        </React.Fragment>
    );
}

export default ProfilePage;