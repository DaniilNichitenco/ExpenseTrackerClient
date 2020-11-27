import { Grid, GridList, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import './FlyingGridTileStyles.scss';

interface ProfileTileProps
{
  maxWidth?: number,
  marginTop?: number,
  marginLeft?: number,
  marginBottom?: number,
  marginRight?: number,
  padding?: number,
  paddingBottom?: number,
  paddingTop?: number,
  paddingLeft?: number,
  paddingRight?: number,
  xs?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  xl?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

  const useStyles = makeStyles((theme) => ({
    container: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    }
  }));

  const FlyingGridTile:React.FC<ProfileTileProps> = (props) => {
    
    const [inProp, setInProp] = useState(true);
    const classes = useStyles();

    return(
    <CSSTransition
    style={{
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      paddingBottom: props.paddingBottom,
      paddingLeft: props.paddingLeft,
      paddingRight: props.paddingRight,
      paddingTop: props.paddingTop
    }} component={GridList} cols={1}
    in={inProp} timeout={1000}
    onMouseEnter={() => setInProp(false)} 
    onMouseLeave={() => setInProp(true)} 
    appear={true}
    classNames="option">
        <Grid xs={props.xs} xl={props.xl}
        direction="column"
        alignContent="center"
        alignItems="center"
        className={classes.container}>
          {props.children}
        </Grid>
      </CSSTransition>
    );
  };

  export default FlyingGridTile;