import { Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    PostContainer: {
        position: "relative",
        color: theme.palette.common.white,
        marginBottom: 0,

        backgroundImage: "url(https://source.unsplash.com/random)",
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

const StartPost: React.FC = () => {

    const styles = useStyles();
    
    return(
        <Paper className={styles.PostContainer}>
            <Container fixed>
                <div className={styles.Overlay}/>
                <Grid container>
                    <Grid item md={6}>
                        <div className={styles.PostContent}>
                            <Typography 
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                            >
                                Expense Tracker Web Application
                            </Typography>
                            <Typography
                            variant="h5"
                            color="inherit"
                            paragraph
                            >
                                FSAfdsa  dafs fdsa ad gfs
                                gdsaf  dsfa fsda sfda 
                                fdsa asdf  sfda dsfa afsd  fdsa
                                fsda fdsa adfs  a sdf
                            </Typography>
                            <Button 
                            variant="contained"
                            color="secondary"
                            >
                                Try it free
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

export default StartPost;