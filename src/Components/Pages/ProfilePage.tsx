import { Card, CardHeader, CardMedia, Paper, Grid, GridList, GridListTile, makeStyles, Typography, Box, Divider, Button } from '@material-ui/core';
import React from 'react';
import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import './ProfilePageStyles.css';
import avatarProfileBgImage from './avatarProfileBg.jpg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

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
        backgroundColor: "E8D5D1",
        width: 300
      },
      userStatusText: {
          fontFamily: "Lucida Bright"
      },
      nameText: {
          fontFamily: "Candara",
          fontSize: "inherit",
          fontWeight: "inherit"
      },
}));

const ProfilePage: React.FC = () => {

    const classes = useStyles();

    return(
        <React.Fragment>
        <AppbarGeneric />
            <AppContent>
            <div className="contentDiv">
                <GridList cols={2} className={classes.contentList} spacing={25}>
                    <GridListTile style={{width: "fit-content", height: "fit-content"}}>
                        <Paper elevation={3} className={classes.paperTile} square={false}>
                            <Box className="boxAvatar">
                                <Box className="avatar" />
                            </Box>
                            <Box className="name">
                                <Typography className={classes.nameText}>FirstName LastName</Typography>
                            </Box>
                            <Box className="userStatus">
                                <Typography className={classes.userStatusText}>
                                    <q>Less I hear the less you'll say<br /> you'll find that out anyway</q>
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
                                    <Typography>Purses:<br/>count</Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>Notes:<br/>count</Typography>
                                </GridListTile>
                                <GridListTile style={{width: "fit-content",height: "fit-content"}}>
                                    <Typography>Occations:<br/>count</Typography>
                                </GridListTile>
                            </GridList>
                        </Paper>
                    </GridListTile>
                    <GridList cols={1}>
                        <GridListTile style={{backgroundColor: 'green', height: "fit-content"}} className="tile">
                            <Paper className={classes.paperTile}>
                                <Link to="/settings" className="link">
                                        <Button>Settings</Button>
                                </Link>
                            </Paper>
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
                    <GridListTile style={{backgroundColor: 'green', height: '50px'}} className={classes.tile}>

                    </GridListTile>
                </GridList>
            </div>
        </AppContent>
        </React.Fragment>
    );
}

export default ProfilePage;