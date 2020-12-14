import { Accordion, AccordionDetails, AccordionSummary,
     Button, CircularProgress, useMediaQuery, 
     Grid, makeStyles, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, Divider, GridList } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../Services/auth.services/auth-service';
import jwt_decode from 'jwt-decode';
import User from '../../Data/Models/User/User';
import { deleteAccountById, getPagedUsers } from '../../Services/user.services/User.service';
import PagedRequest from '../../Services/pagedRequests/PagedRequest';
import GridPaperHeader from '../GridPaper/GridPaperHeader';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditUserForm from '../Forms/AdminForms/EditUserForm';
import useNonInitialEffect from '../../CustomHooks/CustomUseEffectHooks/useNonInitialEffect';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      buttons: {
          width: 100
      }
}));

const UsersPage: React.FC = () => {
    const pageSize: number = 20;
    
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [hasData, setHasData] = useState<boolean>(true);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const theme = useTheme();
    const width = useMediaQuery(theme.breakpoints.down('lg'));
    const [dialog, setDialog] = useState<{
        isOpen: boolean, 
        action: "update" | "delete",
        itemId: number
    }>({isOpen: false, action: "update", itemId: 0});
    const classes = useStyles();
    const token = getCurrentUser().accessToken;
    const userId = (jwt_decode(token) as any).UserId as number;

    useEffect(() => {
        if (isLoadingData)
        {
            handleLoadMore();
        }
      }, [isLoadingData]);

    useNonInitialEffect(() => {
        if(!dialog.isOpen) //if we close nested dialog, we rerender whole component
        {
            setUsers([...[]]);
            setPageIndex(0);
            setHasData(true);
            setHasNextPage(true);
            setIsLoadingData(true);
        }
    }, [dialog])  

      const handleLoadMore = () => {
        if(hasNextPage)
        {
            setIsLoadingData(true);
            const request: PagedRequest = {
            pageIndex: pageIndex,
            pageSize: pageSize
        };

        getPagedUsers(request)
            .then(result => {
                if(result.response.status == 200)
                {
                    console.log(result.data);
                    if(result.data.total == 0)
                    {
                        setHasData(false);
                    }
                    setUsers([...users, ...result.data.items]);
                    setHasNextPage(result.data.items.length == pageSize);
                    setIsLoadingData(false);
                    setPageIndex(pageIndex + 1);
                }
            })
        }
    }

    const infiniteRef = useInfiniteScroll({
        loading:isLoadingData,
        hasNextPage,
        onLoadMore: handleLoadMore,
        scrollContainer: "window"
      });

    const deleteUser = async (id: number) => {
        deleteAccountById(id)
            .then(res => {
                handleClose();
            })
            .catch(error => {
                console.log(error);
                handleClose();
            })
    }

    const handleOpen = (action: "update" | "delete", itemId?: number) => {
        if(itemId == undefined)
        {
            setDialog({...dialog, isOpen: true, action: action});
        }
        else
        {
            setDialog({...dialog, isOpen: true, action: action, itemId: itemId})
        }
      }

      const handleClose = () => {
        setDialog({...dialog, isOpen: false});
    }

    return(
        <List ref={infiniteRef as React.RefObject<HTMLUListElement>} style={{width: "100%", 
        display: "flex", justifyContent:"center"}}>
            <Grid container justify="center" alignItems="baseline" item
            className="contentDiv" xs={10} xl={9}>
                 <Grid item container xs={12} spacing={5} justify="center">
                    <Grid item>
                        <Typography variant="h5">
                            List of users
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item container xs={12} justify="center" spacing={2}> 
                        {
                            !hasData ?
                            <Typography variant="h6">
                                There are not any users
                            </Typography>
                            : 
                            users.map(user => {
                                return(
                                    <Grid key={user.id} item xs={12}>
                                        <Accordion key={user.id} style={{width: "100%"}}>
                                            <Grid item xs={12}>
                                                <GridPaperHeader style={{margin:0}} />
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={user.id + "-content"}
                                                id={user.id + "-header"}
                                                >
                                                    <Typography className={classes.heading}>
                                                        {user.id}. {user.userName}
                                                    </Typography>
                                                </AccordionSummary>
                                            </Grid>
                                            <AccordionDetails>
                                                <Grid container xs={12} spacing={6}>
                                                    <Grid container item xs={12}>
                                                        <Typography>
                                                            Id: {user.id}<br />
                                                            UserName: {user.userName}<br />
                                                            Email: {user.email}<br />
                                                            Name: {user.firstName} {user.lastName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid spacing={3}
                                                        item container xs={12} 
                                                        direction="row-reverse">
                                                        <Grid item>
                                                            <Button variant="contained" 
                                                                color="secondary" 
                                                                onClick={() => {handleOpen("delete", user.id);}}
                                                                className={classes.buttons}
                                                                disabled={user.id == userId}
                                                                >
                                                                <Typography>
                                                                    Delete
                                                                </Typography>
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" 
                                                            color="primary" 
                                                            onClick={() => {handleOpen("update", user.id);console.log(user.id);}}
                                                            className={classes.buttons}
                                                            disabled={user.id == userId}
                                                            >
                                                                <Typography>
                                                                    Edit
                                                                </Typography>
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                );
                            })
                        }
                        {
                            isLoadingData && 
                            <Grid container xs={12} justify="center">
                                <Grid container item xs={12} justify="center">
                                    <CircularProgress color="secondary" />
                                </Grid>
                                <Grid container item xs={12} justify="center">
                                    <Typography variant="h6">
                                        Loading expenses...
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                 </Grid>
            </Grid>
            <Dialog open={dialog.isOpen} fullWidth={width}>
                {dialog.action == "delete" ? 
                <React.Fragment>
                    <DialogTitle>
                        <Grid container justify="center" xs={12}>
                            <Typography variant="h6">Delete user</Typography>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText>
                            <Typography>
                                Are you sure you want to delete this user?
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={async () => {await deleteUser(dialog.itemId)}}
                        >
                        <Typography>
                            Delete
                        </Typography>
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleClose}
                        >
                        <Typography>
                            Close
                        </Typography>
                    </Button>
                    </DialogActions>
                </React.Fragment>
                :
                <EditUserForm handleClose={handleClose} userId={dialog.itemId} />
            }
            </Dialog>
        </List>
    );
}

export default UsersPage;