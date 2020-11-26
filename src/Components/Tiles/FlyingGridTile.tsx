import { Grid } from '@material-ui/core';
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
  xs?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  xl?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

  const FlyingGridTile:React.FC<ProfileTileProps> = (props) => {
    
    const [inProp, setInProp] = useState(true);

    return(
    <CSSTransition xs={props.xs} xl={props.xl}
    style={{
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      padding: props.padding,
    }} component={Grid} 
    in={inProp} timeout={1000}
    onMouseEnter={() => setInProp(false)} 
    onMouseLeave={() => setInProp(true)} 
    appear={true}
    classNames="option">
        <Grid xs={props.xs} xl={props.xl}>
          {props.children}
        </Grid>
      </CSSTransition>
    );
  };

  export default FlyingGridTile;