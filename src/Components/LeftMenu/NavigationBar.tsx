import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import { Omit } from '@material-ui/types';
import './NavigationBarStyles.css';
import { NavLink, useLocation } from 'react-router-dom';
import DefaultUser from '../../Data/Models/User/default/DefaultUser';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import GetDay from '../../Date/DayOfWeek';
import { Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
      color: theme.palette.common.white,
      marginTop: theme.spacing(5)
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      margin: "auto",
      minWidth: 'auto',
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    drawer:{
      position: "fixed"
    }
  });

export interface NavigatorProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {}

const Navigator: React.FC<NavigatorProps> = (props: NavigatorProps) => {
  const { classes, ...other } = props;

  const [userData, setuserData] = useSessionStorage("userData", DefaultUser);


  // const userData = useContext(UserContext).userData;
  const location = useLocation();

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
    },
    {
      id: 'Admin',
      children: [
        { id: 'Analytics', icon: <SettingsIcon />, to: "/" },
        { id: 'Performance', icon: <TimerIcon />, to: "/" },
      ],
    },
  ];


  return (
    <Drawer className={classes.drawer} variant="permanent" {...other} open={true}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          <Typography variant="h5">{GetDay()}</Typography>
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <Typography variant="h5">Hello, {userData.firstName}!</Typography>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, to }) => (
              <ListItem
                key={childId}
                button
                component={NavLink}
                to={to}
                className={classes.item}
                activeClassName={location.pathname == to ? classes.itemActiveItem : classes.item}
                
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);