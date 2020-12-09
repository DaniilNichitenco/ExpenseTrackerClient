import { GridList, Grid, makeStyles, Typography, Box, Divider, Button, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './PageStyles.css';
import FlyingGridTile from '../Tiles/FlyingGridTile';
import { CircularProgress } from '@material-ui/core';
import User from '../../Data/Models/User/User';
import DefaultUser from '../../Data/Models/User/default/DefaultUser';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import PurseExpenseTable from '../Tables/PurseExpenseTable';
import Purse from '../../Data/Models/Purses/Purse';
import { PursesDefault } from '../../Data/Models/Purses/default/PurseDefault';
import { GetCurrentUserPurses } from '../../Services/purse.services/Purse.service';
import EditProfileButton from '../Buttons/EditProfileButton';
import { GetCountUserExpenses } from '../../Services/expense.service/ExpenseService';

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

    const [userData] = useSessionStorage<User>("userData", 
    DefaultUser);
    const classes = useStyles();
    const [isLoadingPurses, setIsLoadingPurses] = useState(true);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
    const [pursesData, setPursesData] = useSessionStorage<Purse[]>("pursesData", []);
    const [countExpenses, setCountExpenses] = useState<number>(0);

    useEffect(() => {
        GetCountUserExpenses().then(res => {
            if(res.response.status == 200)
            {
                setCountExpenses(res.data);
                setIsLoadingExpenses(false);
            }
        });
        GetCurrentUserPurses()
            .then(result => {
                if(result.response.status == 200)
                {
                    setPursesData(result.data);
                    setIsLoadingPurses(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
                                        <EditProfileButton
                                        style={{margin: 5}} />
                                    </Grid>
                                    <Grid item xs={12} style={{height: 170}} />
                            </Grid>
                            <Grid item xs={12} className={classes.name}>
                                <Typography variant="h4"
                                align="center" style={{fontWeight:600}} >
                                    {userData.firstName} {userData.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.subInfo}>
                                <Typography align="center" variant="h6">
                                    <b>Email:</b> {userData.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.subInfo}>
                                <Typography align="center" variant="h6">
                                    <b>UserName:</b> {userData.userName}
                                </Typography>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid justify="space-between" container item xs={11}>
                                <Grid item className={classes.subInfo}>
                                    <Typography>
                                        {
                                            isLoadingPurses ? (<CircularProgress color="secondary" />) :
                                                <><b>Count purses:</b><br/>{pursesData.length}</>
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
                        <PurseExpenseTable />
                    </FlyingGridTile>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ProfilePage;