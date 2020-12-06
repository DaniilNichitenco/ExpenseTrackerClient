import { GridList, Grid, makeStyles, Typography, Box, Divider, Button, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './ProfilePageStyles.css';
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
    info: {
        padding:25,
        justifyContent:"space-between", 
        
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
        // backgroundColor: theme.palette.primary.dark,
        height:"fit-content", 
        borderRadius: "inherit"
    },
    profileHeaderText: {
        marginTop: 25,
        marginBottom:10,
        marginLeft: 15,
        fontSize: 23,
        fontWeight: 'bolder'
    },
    buttonSetting: {
        margin: 5
    }
}));

const ProfilePage: React.FC = () => {

    const [userData, setUserData, removeUserData] = useSessionStorage<User>("userData", 
    DefaultUser);
    // const pursesData = useContext(PursesContext).pursesData;
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [pursesData, setPursesData] = useSessionStorage<Purse[]>("pursesData", []);
    const [countExpenses, setCountExpenses] = useState<number>(0);

    useEffect(() => {
        GetCountUserExpenses().then(res => {
            if(res.response.status == 200)
            {
                setCountExpenses(res.data);
            }
        });
        GetCurrentUserPurses()
            .then(result => {
                if(result.response.status == 200)
                {
                    setPursesData(result.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <React.Fragment> 
            <Grid className="contentDiv" xs={10} xl={9}>
                <div className={classes.profileHeader}>
                    <Typography className={classes.profileHeaderText}>
                        User profile
                    </Typography>
                </div>
                <Divider variant="middle" />
                <GridList cols={2} className={classes.contentList} spacing={25}>
                    <FlyingGridTile xl={9} xs={10} paddingBottom={16}>
                        <Grid spacing={3} style={{height:"fit-content",
                            justifyContent: "center",}} container>
                            <Grid item xs={12} className="boxAvatar">
                                    <Grid xs={12} container direction="row-reverse">
                                        <EditProfileButton
                                        style={{margin: 5}} />
                                    </Grid>
                                    <Box className="avatar" />
                            </Grid>
                            <Grid item xs={12} className="name">
                                <Typography className={classes.nameText}>
                                    {userData.firstName} {userData.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className="email">
                                <Typography>
                                    <b>Email:</b> {userData.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className="email">
                                <Typography>
                                    <b>UserName:</b> {userData.userName}
                                </Typography>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid style={{marginLeft:15, marginRight:15}} container item xs={12} className={classes.info}>
                                <Grid item style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        {
                                            isLoading ? (<CircularProgress color="secondary" />) :
                                                <><b>Count purses:</b><br/>{pursesData.length}</>
                                        }    
                                        </Typography>
                                </Grid>
                                <Grid item style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        {
                                            isLoading ? (<CircularProgress color="secondary" />) : 
                                            <><b>Count expenses:</b><br/>{countExpenses}</>
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FlyingGridTile>
                        <FlyingGridTile>
                            <PurseExpenseTable />
                        </FlyingGridTile>
                </GridList>
            </Grid>
        </React.Fragment>
    );
}

export default ProfilePage;