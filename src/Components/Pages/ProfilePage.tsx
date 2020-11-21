import { GridList, GridListTile, makeStyles, Typography, Box, Divider, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import './ProfilePageStyles.css';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import UserContext from '../../Context/UserContext';
import PursesContext from '../../Context/PursesContext';
import ProfileTile from '../Tiles/ProfileTile';

const useStyles = makeStyles((theme) => ({
    contentList: {
        justifyContent:"center",
        alignItems:"flex-start",
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
    }
}));

const ProfilePage: React.FC = () => {

    const userData = useContext(UserContext).userData;
    const pursesData = useContext(PursesContext).pursesData;

    const classes = useStyles();
    if(!userData.textStatus || userData.textStatus.length == 0)
    {
        userData.textStatus = "Less I hear the less you'll say you'll find that out anyway";
    }

    return(
        <React.Fragment> 
            <div className="contentDiv">
                <div className={classes.profileHeader}>
                    <Typography className={classes.profileHeaderText}>
                        User profile
                    </Typography>
                </div>
                <Divider variant="middle" />
                <GridList cols={2} className={classes.contentList} spacing={25}>
                    <GridListTile style={{width: "fit-content", height: "fit-content", padding: 10}}>
                        <ProfileTile>
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
                                        <b>Purses:</b><br/>{pursesData.count}
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
                        </ProfileTile>
                    </GridListTile>
                    <GridListTile style={{width: "fit-content", height: "fit-content", padding: 10}}>
                        <ProfileTile maxWidth={300}>
                            <GridList cols={1} spacing={5} style={{height:"fit-content", width:"fit-content"}} >
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
                        </ProfileTile>
                    </GridListTile>
                </GridList>
            </div>
        </React.Fragment>
    );
}

export default ProfilePage;