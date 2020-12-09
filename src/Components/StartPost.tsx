import { Container, Grid, makeStyles, Paper, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import SignUpButton from './Buttons/SignUpButton';
import image from "..\\assets\\images\\StartPostBg.jpg";

const useStyles = makeStyles((theme) => ({
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

const StartPost: React.FC = () => {

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

export default StartPost;