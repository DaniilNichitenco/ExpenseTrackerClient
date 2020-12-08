import React from 'react';
import StartPost from '../StartPost';
import { Box, Grid, makeStyles, Paper, Typography} from '@material-ui/core';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const useStyles = makeStyles((theme) => ({
    gridPaper: {
        width: "70%", 
        paddingBottom: 15,
    },
    gridPaperBoxTop: {
        borderRadius: "15px 15px 0 0",
        backgroundColor: theme.palette.primary.dark,
        height: 7,
        marginBottom: 15
    },
    gridPaperGridText: {
        marginLeft:40, 
        marginRight:40
    }
}));

const UnauthorizedPage: React.FC = () => {

    const classes = useStyles();
    
    return(
        <Grid container xs={12}>
            <Grid item xs={12}>
                <StartPost />
            </Grid>
            <Grid item container xs={12} style={{margin: 20}}>
                <Grid item container justify="center" xs={4}>
                    <Paper elevation={10} className={classes.gridPaper}>
                        <Box className={classes.gridPaperBoxTop} />
                        <Grid item container justify="center">
                            <AssignmentTurnedInIcon fontSize="large" />
                        </Grid>
                        <Grid item className={classes.gridPaperGridText}>
                            <Typography variant="h4" align="center">
                                All-in-one finances
                            </Typography>
                            <Typography align="center">
                                We bring all of your money to one place, 
                                from balances and bills to credit score and more.
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item container justify="center" xs={4}>
                    <Paper elevation={10} className={classes.gridPaper}>
                        <Box className={classes.gridPaperBoxTop} />
                        <Grid item container justify="center">
                            <AccountBalanceIcon fontSize="large" />
                        </Grid>
                        <Grid item className={classes.gridPaperGridText}>
                            <Typography variant="h4" align="center">
                                Budgets made simple
                            </Typography>
                            <Typography align="center">
                            Easily create budgets, and see our 
                            suggestions based on your spending.
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item container justify="center" xs={4}>
                    <Paper elevation={10} className={classes.gridPaper}>
                        <Box className={classes.gridPaperBoxTop} />
                        <Grid item container justify="center">
                            <NetworkCheckIcon fontSize="large" />
                        </Grid>
                        <Grid item className={classes.gridPaperGridText}>
                            <Typography variant="h4" align="center">
                                Unlimited credit scores
                            </Typography>
                            <Typography align="center">
                            Check your free credit score as 
                            many times as you like, and get tips to help improve it.
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default UnauthorizedPage;