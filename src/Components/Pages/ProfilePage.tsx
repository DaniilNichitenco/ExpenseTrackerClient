import { Card, CardHeader, CardMedia, Paper, Grid, GridList, GridListTile, makeStyles, Typography, Box, Divider, Button } from '@material-ui/core';
import React from 'react';
import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import './ProfilePageStyles.css';
import avatarProfileBgImage from './avatarProfileBg.jpg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';
import ProfilePageData from '../../Data/ProfilePageData';

const useStyles = makeStyles((theme) => ({
    contentList: {
        justifyContent:"center",
        alignItems:"flex-start",
        overflowX: "hidden",
        spacing: 10,
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
    }
}));

const ProfilePage: React.FC<ProfilePageData> = ({pursesData, userData}) => {

    const classes = useStyles();
    if(!userData.textStatus || userData.textStatus.length == 0)
    {
        userData.textStatus = "Less I hear the less you'll say you'll find that out anyway";
    }

    return(
        <React.Fragment> 
        <AppbarGeneric />
            <AppContent>
            <div className="contentDiv">
                <div className={classes.profileHeader}>
                    <Typography className={classes.profileHeaderText}>
                        User profile
                    </Typography>
                </div>
                <Divider variant="middle" />
                <GridList cols={2} className={classes.contentList} spacing={25}>
                    <GridListTile style={{width: "fit-content", height: "fit-content", padding: 10}}>
                        <div className="paperTile">
                            <Box className="boxAvatar">
                                <Box className="avatar" />
                            </Box>
                            <Box className="name">
                                <Typography className={classes.nameText}>
                                    {userData.firstName} {userData.lastName}
                                </Typography>
                            </Box>
                            <Box className="userStatus">
                                <Typography className={classes.userStatusText}>
                                    <q>{userData.textStatus}</q>
                                </Typography>
                            </Box>
                            <Box className="email">
                                <Typography>
                                    {userData.email}
                                </Typography>
                            </Box>
                            <Box className="email">
                                <Typography>
                                    {userData.username}
                                </Typography>
                            </Box>
                            <Divider variant="middle" />
                            <GridList cols={3} className={classes.info}>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        <b>Purses:</b><br/>{userData.countPurses}
                                        </Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        <b>Notes:</b><br/>{userData.countNotes}
                                    </Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>
                                        <b>Occations:</b><br/>{userData.coutOccations}
                                    </Typography>
                                </GridListTile>
                            </GridList>
                        </div>
                    </GridListTile>
                    <GridListTile style={{width: "fit-content", height: "fit-content", padding: 10}}>
                        <div className="paperTile">
                            <GridList cols={1} spacing={15} style={{height:"fit-content"}} >
                                <GridListTile style={{height: "fit-content", display: 'flex', justifyContent: 'flex-end', padding:17}} className="tile">
                                    <Button variant="contained" 
                                    color="primary"
                                    component={Link} to="/settings" 
                                    startIcon={<SettingsIcon />}>Settings</Button>
                                </GridListTile>
                                <GridListTile style={{height: 'fix-content'}}>
                                    {pursesData.purses.map(({currencyCode, bill}) => (
                                        <React.Fragment key={currencyCode}>
                                            <GridListTile style={{marginBottom:10}}>   
                                            <div className="purseTile">
                                                {currencyCode}
                                            </div>
                                            <div style={{marginLeft:10, marginTop:8}}>
                                                <Typography>
                                                    Bill: {bill}
                                                </Typography>
                                            </div>
                                            </GridListTile>
                                        </React.Fragment>
                                    ))}
                                </GridListTile>
                                <GridListTile style={{height: '50px'}}>
                                    <Typography>
                                        ANOTHER INTORMATION
                                    </Typography>
                                </GridListTile>
                            </GridList>
                        </div>
                    </GridListTile>
                    <GridListTile style={{height: '50px'}} className="paperTile">

                    </GridListTile>
                </GridList>
            </div>
        </AppContent>
        </React.Fragment>
    );
}

export default ProfilePage;