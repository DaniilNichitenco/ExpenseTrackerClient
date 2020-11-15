import React, { useState } from 'react';
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProfileTileStyles.scss';

interface ProfileTileProps
{
  maxWidth?: number
}

  const ProfileTile:React.FC<ProfileTileProps> = (props) => {
    
    const [inProp, setInProp] = useState(true);

    return(
    <CSSTransition in={inProp} timeout={1000} 
    onMouseEnter={() => setInProp(false)} 
    onMouseLeave={() => setInProp(true)} 
    onEntered={() => console.log("entered")}
    onEntering={() => console.log("entering")}
    onEnter={() => console.log("enter")}
    onExit={() => console.log("exit")}
    onExiting={() => console.log("exiting")}
    onExited={() => console.log("exited")}
    appear={true}
    classNames="option">
        <div style={{maxWidth:props.maxWidth, position:"static"}}>
          {props.children}
        </div>
      </CSSTransition>
    );
  };

  export default ProfileTile;