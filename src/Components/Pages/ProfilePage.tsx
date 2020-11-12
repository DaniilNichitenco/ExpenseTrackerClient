import { Card, CardHeader, CardMedia, Paper, Grid, GridList, GridListTile, makeStyles, Typography, Box, Divider, Button } from '@material-ui/core';
import React from 'react';
import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import './ProfilePageStyles.css';
import avatarProfileBgImage from './avatarProfileBg.jpg';
import { Link } from 'react-router-dom';

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
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:25,
        paddingRight:25,
        justifyContent:"space-between", 
        
    },
    tile: {
        border: "1px solid black"
    },
    avatar: {
        marginLeft: 80,
        marginRight:80,
        marginTop:15,
        marginBottom:10,
        padding: 0,
        border: "1px solid white",
        borderRadius: 50
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      cardAvatar: {
        justifyContent:"center",
        alignItems:"center",
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        maxWidth: 250
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
      }
}));


const ProfilePage: React.FC = () => {

    const styles = useStyles();

    return(
        <React.Fragment>
        <AppbarGeneric />
            <AppContent>
            <div className="contentDiv">
                <GridList cols={2} className={styles.contentList} spacing={25}>
                    <GridListTile style={{width: "fit-content",height: "fit-content"}} className="tile GridListTileAvatar">
                        <Paper elevation={3} className={styles.paperTile} square={false}>
                            <Box className="boxAvatar">
                                <Box className="avatar" />
                            </Box>
                            <Box className="name">
                                <Typography className={styles.nameText}>FirstName LastName</Typography>
                            </Box>
                            <Box className="userStatus">
                                <Typography className={styles.userStatusText}>
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
                            <GridList cols={3} className={styles.info}>
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
                        <GridListTile style={{backgroundColor: 'green', height: '50px'}} className="tile">
                            <Box>
                                <Link to="/settings" className="link">
                                    <Button>Settings</Button>
                                </Link>
                            </Box>
                        </GridListTile>
                        <GridListTile style={{backgroundColor: 'green', height: '50px'}} className={styles.tile}>
                        <Typography>
                            PURSES
                        </Typography>
                        </GridListTile>
                        <GridListTile style={{backgroundColor: 'green', height: '50px'}} className={styles.tile}>
                        <Typography>
                            ANOTHER INTORMATION
                        </Typography>
                        </GridListTile>
                    </GridList>
                    <GridListTile style={{backgroundColor: 'green', height: '50px'}} className={styles.tile}>

                    </GridListTile>
                </GridList>
            </div>
        </AppContent>
        </React.Fragment>
    );
}

export default ProfilePage;