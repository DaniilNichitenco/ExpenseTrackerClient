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
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Omit } from '@material-ui/types';
import './NavigationBarStyles.css';
import UserContext from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';

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

  const userData = useContext(UserContext).userData;
  const history = useHistory();

  const [categories, setCategories] = useState([
    {
      id: 'Develop',
      children: [
        { id: 'Registration', icon: <PeopleIcon />, to: "/registration", active: true },
        { id: 'Profile', icon: <DnsRoundedIcon />, to: "/home/profile" },
        { id: 'Home', icon: <PermMediaOutlinedIcon />, to: "/home" },
        { id: 'Hosting', icon: <PublicIcon />, to: "" },
      ],
    },
    {
      id: 'Quality',
      children: [
        { id: 'Analytics', icon: <SettingsIcon />, to: "" },
        { id: 'Performance', icon: <TimerIcon />, to: "" },
        { id: 'Test Lab', icon: <PhonelinkSetupIcon />, to: "" },
      ],
    },
  ]);

  useEffect(() => {
    const pathname = window.location.pathname;
    categories.forEach(parent => {
      parent.children.forEach(child => {
        if(child.to != pathname)
          {
            child.active = false;
          }
          else
          {
            child.active = true;
          }
      });
    });

    setCategories([...categories]);
  }, []);

  const tabToggle = (id: string) => {

    categories.forEach(parent => {
      parent.children.forEach(child => {
        if(child.id != id)
        {
          child.active = false;
        }
        else
        {
          child.active = true;
        }
      });
    });
    setCategories([...categories]);
  }

  return (
    <Drawer className={classes.drawer} variant="permanent" {...other} open={true}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Hello, {userData.firstName}!
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <div className="avatar1"></div>
          </ListItemIcon>
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
            {children.map(({ id: childId, icon, active, to }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
                onClick={() => {tabToggle(childId); history.push(to); console.log(window.location.pathname);}}
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