import { Card, CardHeader, CardMedia, Paper, Grid, GridList, GridListTile, makeStyles, Typography, Box, Divider, Button } from '@material-ui/core';
import React from 'react';
import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import './ProfilePageStyles.css';
import avatarProfileBgImage from './avatarProfileBg.jpg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';

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

const ProfilePage: React.FC = () => {

    const classes = useStyles();

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
                                <Typography className={classes.nameText}>FirstName LastName</Typography>
                            </Box>
                            <Box className="userStatus">
                                <Typography className={classes.userStatusText}>
                                    <q>Less I hear the less you'll say you'll find that out anyway</q>
                                </Typography>
                            </Box>
                            <Box className="email">
                                <Typography>Email@gmail.com</Typography>
                            </Box>
                            <Box className="email">
                                <Typography>Username</Typography>
                            </Box>
                            <Divider variant="middle" />
                            <GridList cols={3} className={classes.info}>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography><b>Purses:</b><br/>count</Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography><b>Notes:</b><br/>count</Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography><b>Occations:</b><br/>count</Typography>
                                </GridListTile>
                            </GridList>
                        </div>
                    </GridListTile>
                    <GridListTile className="paperTile">
                        <GridList cols={1} spacing={15} >
                            <GridListTile style={{backgroundColor: 'green', height: "fit-content", display: 'flex', justifyContent: 'flex-end'}} className="tile">
                                <Button variant="contained" 
                                 color="secondary"
                                 component={Link} to="/settings" 
                                 startIcon={<SettingsIcon />}>Settings</Button>
                            </GridListTile>
                            <GridListTile style={{backgroundColor: 'green', height: '50px'}} className={classes.tile}>
                                <Typography>
                                    PURSES
                                </Typography>
                            </GridListTile>
                            <GridListTile style={{backgroundColor: 'green', height: '50px'}} className={classes.tile}>
                                <Typography>
                                    ANOTHER INTORMATION
                                </Typography>
                            </GridListTile>
                        </GridList>
                    </GridListTile>
                    <GridListTile style={{backgroundColor: 'green', height: '50px'}} className={classes.tile}>

                    </GridListTile>
                </GridList>
            </div>
        </AppContent>
        </React.Fragment>
    );
}

export default ProfilePage;