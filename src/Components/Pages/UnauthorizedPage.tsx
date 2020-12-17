import React from 'react';
import { Container, Divider, Grid, makeStyles, 
    Paper, Typography, useTheme} from '@material-ui/core';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BarDiagram from '../Diagrams/Generic/BarDiagram';
import RadarDiagram from '../Diagrams/Generic/RadarDiagram';
import DoughnutDiagram from '../Diagrams/Generic/DoughnutDiagram';
import SignInButton from '../Buttons/SignInButton';
import SignUpButton from '../Buttons/SignUpButton';
import GridPaperHeader from '../GridPaper/GridPaperHeader';
import image from "../../assets/images/StartPostBg.jpg";

const useStyles = makeStyles((theme) => ({
    gridPaper: {
        width: "70%", 
        paddingBottom: 15,
    },
    gridPaperGridText: {
        marginLeft:40, 
        marginRight:40
    },
    PostContainer: {
        position: "relative",
        color: theme.palette.common.white,
        marginBottom: 0,

        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    Overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0,0,0,0.3)"
    },
    PostContent: {
        position: "relative",
        padding: theme.spacing(9)
    }
}));

const StartPost = () => {
    
    const styles = useStyles();
    const theme = useTheme();
    
    return(
        <Paper square elevation={6} className={styles.PostContainer}>
            <Container fixed>
                <div className={styles.Overlay}/>
                <Grid container>
                    <Grid item container xs={6} className={styles.PostContent} justify="flex-start">
                            <Typography 
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                            align="left"
                            >
                                It’s all coming together
                            </Typography>
                            <Typography
                            variant="h5"
                            color="inherit"
                            paragraph
                            align="left"
                            >
                                When you’re on top of your money, life is good. We help you
                                effortlessly manage your finances in one place.
                            </Typography>
                            <SignUpButton text="Try It Free" 
                            textVariant="h6" style={{
                                paddingLeft: 25,
                                paddingRight: 25,
                                paddingTop: 13,
                                paddingBottom: 13,
                                backgroundColor: theme.palette.primary.dark
                                }} />
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

const Diagram1 = () => {

    const data = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "USD",
                backgroundColor: "#33E011",
                borderColor: "#33E011",
                borderWidth: 1,
                hoverBackgroundColor: "#39FE12",
                hoverBorderColor: "#39FE12",
                data: [45, 63, 36, 74, 19, 47, 35]
            },
            {
                label: "RUB",
                backgroundColor: "#1937C8",
                borderColor: "#1937C8",
                borderWidth: 1,
                hoverBackgroundColor: "#4364FF",
                hoverBorderColor: "#4364FF",
                data: [35, 60, 70, 54, 67, 40, 53]
            },
            {
                label: "GBR",
                backgroundColor: "#00BA7F",
                borderColor: "#00BA7F",
                borderWidth: 1,
                hoverBackgroundColor: "#00FFAE",
                hoverBorderColor: "#00FFAE",
                data: [43, 23, 47, 65, 46, 53, 78]
            }
        ]}

    return(
        <Grid item style={{marginLeft: 30, marginRight: 20, paddingTop: 20}}>
            <BarDiagram data={data} />
        </Grid>
    );
}

const Diagram2 = () => {
    const data = {
        labels: ["Transport", "Health", "Food", "Amusement", "Others"],
        datasets: [
            {
                label: "USD",
                lineTension: 0.1,
                fill: false,
                backgroundColor: "#33E011",
                borderColor: "#33E011",
                pointBackgroundColor: "#33E011",
                pointHoverBorderColor: "#39FE12",
                pointHoverBackgroundColor: "#39FE12",
                pointBorderColor: "#33E011",
                pointBorderWidth: 2,
                pointHoverRadius: 9,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: [13, 27, 29, 13, 18]
            },
            {
                label: "RUB",
                lineTension: 0.1,
                fill: false,
                backgroundColor: "#1937C8",
                borderColor: "#1937C8",
                pointBackgroundColor: "#1937C8",
                pointHoverBorderColor: "#4364FF",
                pointHoverBackgroundColor: "#4364FF",
                pointBorderColor: "#1937C8",
                pointBorderWidth: 2,
                pointHoverRadius: 9,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: [25, 15, 26, 21, 13]
            },
            {
                label: "GBR",
                lineTension: 0.1,
                fill: false,
                backgroundColor: "#00BA7F",
                borderColor: "#00BA7F",
                pointBackgroundColor: "#00BA7F",
                pointHoverBorderColor: "#00FFAE",
                pointHoverBackgroundColor: "#00FFAE",
                pointBorderColor: "#00BA7F",
                pointBorderWidth: 2,
                pointHoverRadius: 9,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: [20, 13, 21, 31, 15]
            }
        ]}

    return(
        <Grid item style={{marginLeft: 30, marginRight: 20, paddingTop: 20}}>
            <RadarDiagram data={data} />
        </Grid>
    );
}

const Diagram3 = () => {
    const data = {
        labels: ["Remaining money", "Daily expenses"],
        datasets: [
            {
                label: "USD",
                backgroundColor: ["#03A600", "#DD0000"],
                borderColor: "black",
                hoverBackgroundColor: ["#39FE12", "#FF1010"],
                borderWidth: 1,
                data: [43, 69]
            }
        ]}

    return(
        <Grid item style={{marginLeft: 30, marginRight: 20,
         paddingTop: 20, paddingBottom: 20}}>
            <DoughnutDiagram data={data} legend={{
                display: true,
                position: "right"
            }}
            title={{
                display: true,
                text: "Daily plan",
                fontSize: 26
            }}
            cutoutPercentage={65} />
        </Grid>
    );
}

const UnauthorizedPage: React.FC = () => {

    const classes = useStyles();
    const theme = useTheme();
    
    return(
        <Grid container xs={12} style={{paddingBottom: 50}}>
            <Grid item xs={12}>
                <StartPost />
            </Grid>
            <Grid item container xs={12} style={{margin: 20}}>
                <Grid item container justify="space-evenly" xs={4} xl={3}>
                    <Paper elevation={10} className={classes.gridPaper}>
                        <GridPaperHeader />
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
                <Grid item container justify="space-evenly" xs={4} xl={3}>
                    <Paper elevation={10} className={classes.gridPaper}>
                        <GridPaperHeader />
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
                <Grid item container justify="space-evenly" xs={4} xl={3}>
                    <Paper elevation={10} className={classes.gridPaper}>
                        <GridPaperHeader />
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
            <Grid item container alignItems="center" justify="space-evenly"
             style={{margin:20}} xs={12} xl={11} spacing={8}>
                <Grid item xs={7}>
                    <Paper elevation={8}>
                        <GridPaperHeader />
                        <Diagram1 />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                        <Typography variant="h3" align="center">
                            Track your expenses for every day
                        </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justify="space-evenly"
             style={{margin:20}} xs={12} xl={11} spacing={8}>
                <Grid item xs={4}>
                        <Typography variant="h3" align="center">
                            Check where you spend too much money
                        </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Paper elevation={8}>
                        <GridPaperHeader />
                        <Diagram2 />
                    </Paper>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justify="space-evenly"
             style={{margin:20}} xs={12} xl={11} spacing={8}>
                <Grid item xs={7}>
                    <Paper elevation={8}>
                    <GridPaperHeader />
                        <Diagram3 />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                        <Typography variant="h3" align="center">
                            Set up a monthly plan and we'll help you
                            control expenses every day
                        </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justify="space-evenly"
             style={{margin:20}} xs={12} xl={11} spacing={8}>
                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" style={{marginBottom:10}}>
                        Sign up for Expense Tracker today
                    </Typography>
                    <Typography align="center">
                    From budgets and bills to free credit score and more, 
                    you’ll discover the effortless way to stay on top of it all.
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={4} justify="center">
                    <Grid container item justify="flex-end" xs={6}>
                        <SignUpButton text="Sign up free"
                        style={{
                            backgroundColor: theme.palette.primary.dark,
                            width: 140
                        }}
                         textVariant="h6" />
                    </Grid>
                    <Grid container item justify="flex-start" xs={6}>
                        <SignInButton text="Sign in"
                        style={{
                            color: theme.palette.primary.dark,
                            width: 140
                        }}
                         textVariant="h6" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default UnauthorizedPage;