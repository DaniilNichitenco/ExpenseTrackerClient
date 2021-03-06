import { Accordion, AccordionDetails, AccordionSummary, Button, 
    CircularProgress, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Divider, Grid, makeStyles, 
    Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useNonInitialEffect from '../../CustomHooks/CustomUseEffectHooks/useNonInitialEffect';
import GridPaperHeader from '../GridPaper/GridPaperHeader';
import { deleteTopic, getMaxUserTopics, getTopicsForList } from '../../Services/topic.services/TopicService';
import TopicForList from '../../Data/Models/Topics/TopicForList';
import CreateTopicForm from '../Forms/topicForms/CreateTopicForm';
import EditTopicForm from '../Forms/topicForms/EditTopicForm';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      buttons: {
          width: 100
      }
}));

export const TopicsPage: React.FC = () => {

    const classes = useStyles();
    const [isLoadingTopics, setIsLoadingTopics] = useState<boolean>(true);
    const [topicsForList, setTopicsForList] = useState<TopicForList[]>([]);
    const [maxCountTopics, setMaxCountTopics] = useState<number>(0);
    const [isLoadingCurrencies, setIsLoadingCurrencies] = useState<boolean>(true);
    const theme = useTheme();
    const [dialog, setDialog] = useState<{
        isOpen: boolean, 
        action: "update" | "create" | "delete",
        itemId: number
    }>({isOpen: false, action: "update", itemId: 0});
    const width = useMediaQuery(theme.breakpoints.down('lg'));

    const handleOpen = (action: "update" | "create" | "delete", itemId?: number) => {
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

    useEffect(() => {
        getTopicsForList()
            .then(res => {
                if(res.response.status == 200)
                {
                    setTopicsForList([...res.data]);
                    setIsLoadingTopics(false);
                }
            })
            .catch(error => {
                console.log(error);
            });;

        getMaxUserTopics()
            .then(res => {
                if(res.response.status == 200)
                {
                    setMaxCountTopics(res.data);
                    setIsLoadingCurrencies(false);
                }
            })
            .catch(error => {
                console.log(error);
            });;
    }, []);

    useNonInitialEffect(() => {
        if(!dialog.isOpen) //if we close nested dialog, we rerender whole component
        {
            setIsLoadingTopics(true);
            getTopicsForList()
                .then(res => {
                if(res.response.status == 200)
                {
                    setTopicsForList([...res.data]);
                    setIsLoadingTopics(false);
                }
            })
            .catch(error => {
                console.log(error);
            });;
        }
    }, [dialog])

    const handleDeleteTopic = async (id: number) => {
        deleteTopic(id)
            .then(res => {
                handleClose();
            })
            .catch(error => {
                console.log(error);
                handleClose();
            });
    }

    if(isLoadingTopics)
    {
      return (
        <Grid container xs={12} justify="center">
          <CircularProgress color="secondary" />
        </Grid>
      );
    }

    return(
        <React.Fragment>
            <Grid container justify="center" alignItems="baseline"
            className="contentDiv" xs={10} xl={9}>
                <Grid item container xs={12} spacing={5}>
                    <Grid item container xs={12} direction="row-reverse"
                    spacing={2} alignItems="center">
                        <Grid item>
                            {isLoadingTopics || isLoadingCurrencies ? 
                            <CircularProgress color="secondary" /> :
                            <Button color="secondary" 
                            disabled={topicsForList.length >= maxCountTopics} 
                            variant="outlined" onClick={() => {handleOpen("create");}}>
                                Create
                            </Button>
                            }
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Count topics: {isLoadingTopics ?
                                <CircularProgress color="secondary" /> :
                                    topicsForList.length}/{isLoadingCurrencies ?
                                <CircularProgress color="secondary" /> :
                                    maxCountTopics}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Divider variant="middle" />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justify="center" spacing={2}>
                        {isLoadingTopics ? 
                        <Grid item>
                            <CircularProgress color="secondary" />
                        </Grid> :
                        topicsForList.length == 0 ? 
                        <Grid item>
                            <Typography variant="h5">
                                There are not any topics
                            </Typography>
                        </Grid> :
                        topicsForList.map((topic) => {
                            return(
                                <Grid key={topic.id} item container xs={12} justify="center">
                                    <Accordion key={topic.id} style={{width: "100%"}}>
                                        <Grid item xs={12}>
                                            <GridPaperHeader style={{margin:0}} />
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={topic.id + "-content"}
                                            id={topic.id + "-header"}
                                            >
                                                <Typography className={classes.heading}>
                                                    {topic.name}
                                                </Typography>
                                            </AccordionSummary>
                                        </Grid>
                                        <AccordionDetails>
                                            <Grid container xs={12} spacing={6}>
                                                <Grid container item xs={12}>
                                                    <Typography>
                                                        Topic name: {topic.name} <br/>
                                                        Count expenses: {topic.countExpenses}
                                                    </Typography>
                                                </Grid>
                                                <Grid spacing={3}
                                                    item container xs={12} 
                                                    direction="row-reverse">
                                                    <Grid item>
                                                        <Button variant="contained" 
                                                            color="secondary" 
                                                            onClick={() => {handleOpen("delete", topic.id);}}
                                                            className={classes.buttons}
                                                            disabled={topic.isGeneral} >
                                                            <Typography>
                                                                Delete
                                                            </Typography>
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant="contained" 
                                                        color="primary" 
                                                        onClick={() => {handleOpen("update", topic.id);}}
                                                        className={classes.buttons}
                                                        disabled={topic.isGeneral} >
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
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={dialog.isOpen} fullWidth={width}>
                {dialog.action == "create" ? 
                <CreateTopicForm handleClose={handleClose} /> :
                dialog.action == "update" ?
                <EditTopicForm topicId={dialog.itemId} handleClose={handleClose} /> :
                <React.Fragment>
                    <DialogTitle>
                        <Grid container justify="center" xs={12}>
                            <Typography variant="h6">Delete topic?</Typography>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText>
                            <Typography>
                                Are you sure you want to delete this topic?
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={async () => {await handleDeleteTopic(dialog.itemId);}}
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
                }
            </Dialog>
        </React.Fragment>
    );
}

export default TopicsPage;