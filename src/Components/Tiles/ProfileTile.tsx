import React, { useState } from 'react';
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProfileTileStyles.scss';

interface ProfileTileProps
{
  maxWidth?: number,
  marginTop?: number,
  marginLeft?: number,
  marginBottom?: number,
  marginRight?: number,
  padding?: number
}

  const ProfileTile:React.FC<ProfileTileProps> = (props) => {
    
    const [inProp, setInProp] = useState(true);

    return(
    <CSSTransition in={inProp} timeout={1000} 
    onMouseEnter={() => setInProp(false)} 
    onMouseLeave={() => setInProp(true)} 
    appear={true}
    classNames="option">
        <div style={{
          maxWidth:props.maxWidth,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          position:"static",
          padding: props.padding,
          }}>
          {props.children}
        </div>
      </CSSTransition>
    );
  };

  export default ProfileTile;