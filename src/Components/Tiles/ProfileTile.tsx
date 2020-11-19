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
    appear={true}
    classNames="option">
        <div style={{maxWidth:props.maxWidth, position:"static"}}>
          {props.children}
        </div>
      </CSSTransition>
    );
  };

  export default ProfileTile;