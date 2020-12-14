import React from 'react';
import clsx from 'clsx';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Omit } from '@material-ui/types';
import { NavLink, useLocation } from 'react-router-dom';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import { Typography } from '@material-ui/core';
import User from '../../Data/Models/User/User';
import { format } from 'date-fns';

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
      marginTop: theme.spacing(7)
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      margin: "auto",
      marginRight: 3,
      minWidth: 'auto',
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    drawer:{
      position: "fixed"
    }
  });

export interface NavigatorProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> 
{
  categories: {
    id: string;
    children: {
      id: string;
      icon: JSX.Element;
      to: string;
    }[];
  }[];
}

const Navigator: React.FC<NavigatorProps> = (props: NavigatorProps) => {
  const { classes, ...other } = props;

  const [userData] = useSessionStorage<User | undefined>("userData", undefined, true);
  const location = useLocation();

  return (
    <Drawer className={classes.drawer} variant="permanent" {...other} open={true}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          <Typography variant="h5">
            {format(
              new Date(),
              "MMMM d, yyyy"
            )}
</Typography>
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <Typography variant="h5">Hello, {userData != undefined && userData.firstName}!</Typography>
        </ListItem>
        {props.categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                <Typography variant="h6" style={{color: "white"}}>
                  {id}
                </Typography>
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
                  <Typography>
                    {childId}
                  </Typography>
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