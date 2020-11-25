import { GridList, GridListTile, makeStyles, Typography, Box, Divider, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { GetCurrentUserData } from '../../Services/user.services/User.service';
import './ProfilePageStyles.css';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import UserContext from '../../Context/UserContext';
import PursesContext from '../../Context/PursesContext';
import ProfileTile from '../Tiles/ProfileTile';
import useSessionStorageAsync from '../../CustomHooks/StorageHooks/AsyncHooks/useSessionStorageAsync';
import User from '../../Data/Models/User/User';
import DefaultUser from '../../Data/Models/User/default/DefaultUser';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import PurseExpenseTable from '../Tables/PurseExpenseTable';

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

    const [userData, setUserData, removeUserData] = useSessionStorage<User>("UserInfo", 
    DefaultUser);
    const pursesData = useContext(PursesContext).pursesData;
    const classes = useStyles();

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
                                    <q>Less I hear the less you'll say you'll find that out anyway</q>
                                </Typography>
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
                                        <b>Purses:</b><br/>{pursesData.count}
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
                    <GridListTile style={{width: "fit-content", height: "fit-content", padding: 10}}>
                        <ProfileTile>
                            <PurseExpenseTable />
                        </ProfileTile>
                    </GridListTile>
                </GridList>
            </div>
        </React.Fragment>
    );
}

export default ProfilePage;