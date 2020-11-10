import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';

import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom";

import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography, makeStyles
  } from "@material-ui/core"

interface SidebarItems
{
    items: items[]
}

interface items
{
    name: string,
    label: string,
    items?: items[]
}

// const useStyles = makeStyles((theme) => ({
//     sidebar:{
//         marginTop: theme.spacing(8),
//         maxWidth:240,
//         border: "1px solid rgba(0, 0, 0, 0.1)",
//         position:"relative",
//         paddingBottom:100, 
//         top:0,
//         bottom:0, 
//         left:0, 
//         right:0,
//         marginBottom:0
//     },
//     sidebar_subitem_text: {
//         fontSize: "0.8rem"
//     }
// }));

// const Sidebar: React.FC<SidebarItems> = ({items, children}) => {
    
//     const styles = useStyles();

//     return (
//         <React.Fragment>
//             <div className={styles.sidebar}>
//             <List disablePadding dense>
//                 {items.map(({ label, name, items: subItems, ...rest }) => {
//                 return (
//                     <React.Fragment key={name}>
//                     <ListItem style={{ paddingLeft: 18 }} button {...rest}>
//                         <ListItemText>{label}</ListItemText>
//                     </ListItem>
//                     {Array.isArray(subItems) ? (
//                         <List disablePadding dense>
//                         {subItems.map((subItem) => {
//                             return (
//                             <ListItem
//                                 key={subItem.name}
//                                 style={{ paddingLeft: 36 }}
//                                 button
//                                 dense
//                             >
//                                 <ListItemText>
//                                 <span className={styles.sidebar_subitem_text}>
//                                     {subItem.label}
//                                 </span>
//                                 </ListItemText>
//                             </ListItem>
//                             )
//                         })}
//                         </List>
//                     ) : null}
//                     </React.Fragment>
//                 )
//                 })}
//             </List>
//             </div>
//             {children}
//         </React.Fragment>
//       );
// }

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit', marginTop: theme.spacing(8) },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }))

const Sidebar: React.FC = () => {

    const styles = useStyles();

    return(

        <Drawer
          style={{ width: '220px' }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: styles.drawerPaper }}
        >
          <List>
            <Link to="/" className={styles.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/registration" className={styles.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Registraition"} />
              </ListItem>
            </Link>
            <Link to="/start" className={styles.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Start page"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
    );
}

export default Sidebar;