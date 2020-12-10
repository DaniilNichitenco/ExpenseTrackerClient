import React, { useEffect, useState } from 'react';
import { GetCurrentUser } from '../../Services/auth.services/auth-service';
import Navigator from './NavigationBar';
import jwt_decode from 'jwt-decode';
import { CircularProgress, Grid } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';

  const drawerWidth = 256;

  const categoriesAdmin = [
    {
      id: 'Menu',
      children: [
        { id: 'Registration', icon: <PeopleIcon />, to: "/registration" },
        { id: 'Profile', icon: <DnsRoundedIcon />, to: "/au/profile" },
        { id: 'Home', icon: <PermMediaOutlinedIcon />, to: "/au/home" },
        { id: 'Purses', icon: <PublicIcon />, to: "/au/purses" },
        { id: 'Statistic', icon: <PublicIcon />, to: "/au/statistic" },
      ],
    }, 
    {
      id: 'Admin',
      children: [
        { id: 'Analytics', icon: <SettingsIcon />, to: "/" },
        { id: 'Performance', icon: <TimerIcon />, to: "/" },
      ],
    },
  ];

  const categories = [
    {
      id: 'Menu',
      children: [
        { id: 'Registration', icon: <PeopleIcon />, to: "/registration" },
        { id: 'Profile', icon: <DnsRoundedIcon />, to: "/au/profile" },
        { id: 'Home', icon: <PermMediaOutlinedIcon />, to: "/au/home" },
        { id: 'Purses', icon: <PublicIcon />, to: "/au/purses" },
        { id: 'Statistic', icon: <PublicIcon />, to: "/au/statistic" },
      ],
    }
  ];

  const LeftMenu: React.FC = () => {

    const [role, setRole] = useState<string>();

    useEffect(() => {
      const token = GetCurrentUser().accessToken;
      const role: string = (jwt_decode(token) as any).Role;
      setRole(role);
    }, []);

    if(role == undefined)
    {
      return(
        <Grid container xs={12}>
          <CircularProgress color="secondary" />
        </Grid>
      )
    }

    if(role == "admin")
    {
      return(
        <Navigator categories={categoriesAdmin} PaperProps={{ style: { width: drawerWidth } }} />
    );
    }

    return(
        <Navigator categories={categories} PaperProps={{ style: { width: drawerWidth } }} />
    );
  }

  export default LeftMenu;