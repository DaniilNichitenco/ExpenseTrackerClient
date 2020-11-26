import { GridList, Grid, GridListTile, makeStyles, Typography, Box, Divider, Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import './ProfilePageStyles.css';
import FlyingGridTile from '../Tiles/FlyingGridTile';
import { CircularProgress } from '@material-ui/core';
import User from '../../Data/Models/User/User';
import DefaultUser from '../../Data/Models/User/default/DefaultUser';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import PurseExpenseTable from '../Tables/PurseExpenseTable';
import Purse from '../../Data/Models/Purses/Purse';
import { PursesDefault } from '../../Data/Models/Purses/default/PurseDefault';
import PursesService from '../../Services/purse.services/Purse.service';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    contentList: {
        justifyContent:"center",
        // alignItems:"flex-start",
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

    const [userData, setUserData, removeUserData] = useSessionStorage<User>("UserInfo", 
    DefaultUser);
    // const pursesData = useContext(PursesContext).pursesData;
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [pursesData, setPursesData, removePursesData] = useSessionStorage<Purse[]>("pursesData", PursesDefault);

    useEffect(() => {
        if(pursesData == PursesDefault)
    {
        PursesService.GetCurrentUserPurses()
            .then(result => {
                if(result.response.status == 200)
                {
                    setPursesData(result.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    else
    {
        setIsLoading(false);
    }
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
                <FlyingGridTile xl={9} xs={10}>
                        <Box className="boxAvatar">
                                <Grid container direction="row-reverse">
                                    <Button
                                        className={classes.buttonSetting}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<SettingsIcon />}
                                    >
                                        Edit profile
                                    </Button>
                                </Grid>
                                <Box className="avatar" />
                            </Box>
                            <Box className="name">
                                <Typography className={classes.nameText}>
                                    {userData.firstName} {userData.lastName}
                                </Typography>
                            </Box>
                            <Box className="userStatus">
                            </Box>
                            <Box className="email">
                                <Typography>
                                    {userData.email}
                                </Typography>
                            </Box>
                            <Box className="email">
                                <Typography>
                                    {userData.userName}
                                </Typography>
                            </Box>
                            <Divider variant="middle" />
                            <GridList cols={3} className={classes.info}>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        {
                                            isLoading ? (<CircularProgress color="secondary" />) :
                                                <><b>Purses:</b><br/>{pursesData.length}</>
                                        }    
                                        </Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        <b>Notes:</b><br/>0
                                    </Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        <b>Occations:</b><br/>0
                                    </Typography>
                                </GridListTile>
                            </GridList>
                        </FlyingGridTile>
                    <GridListTile style={{width: "fit-content", height: "fit-content", padding: 10}}>
                        <FlyingGridTile>
                            <PurseExpenseTable />
                        </FlyingGridTile>
                    </GridListTile>
                </GridList>
            </Grid>
        </React.Fragment>
    );
}

export default ProfilePage;