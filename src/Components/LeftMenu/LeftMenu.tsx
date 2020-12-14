import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../Services/auth.services/auth-service';
import Navigator from './NavigationBar';
import jwt_decode from 'jwt-decode';
import { CircularProgress, Grid } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PersonIcon from '@material-ui/icons/Person';
import NotesIcon from '@material-ui/icons/Notes';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import BarChartIcon from '@material-ui/icons/BarChart';

  const drawerWidth = 256;

  const categoriesAdmin = [
    {
      id: 'Menu',
      children: [
        { id: 'Home', icon: <HomeWorkIcon />, to: "/au/home" },
        { id: 'Profile', icon: <PersonIcon />, to: "/au/profile" },
        { id: 'Purses', icon: <DnsRoundedIcon />, to: "/au/purses" },
        { id: 'Topics', icon: <NotesIcon />, to: "/au/topics" },
        { id: 'Statistic', icon: <BarChartIcon />, to: "/au/statistic" },
      ],
    }, 
    {
      id: 'Admin',
      children: [
        { id: 'Users', icon: <PeopleIcon />, to: "/au/admin/users" },
      ],
    },
  ];

  const categories = [
    {
      id: 'Menu',
      children: [
        { id: 'Home', icon: <HomeWorkIcon />, to: "/au/home" },
        { id: 'Profile', icon: <PersonIcon />, to: "/au/profile" },
        { id: 'Purses', icon: <DnsRoundedIcon />, to: "/au/purses" },
        { id: 'Topics', icon: <NotesIcon />, to: "/au/topics" },
        { id: 'Statistic', icon: <BarChartIcon />, to: "/au/statistic" },
      ],
    }
  ];

  const LeftMenu: React.FC = () => {

    const [role, setRole] = useState<string>();

    useEffect(() => {
      const token = getCurrentUser().accessToken;
      const role: string = (jwt_decode(token) as any).Role;
      setRole(role);
    }, []);

    if(role == undefined)
    {
      return(
        <Grid container>
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