import React, { useState } from 'react';
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProfileTileStyles.scss';

  const ProfileTile:React.FC = (props) => {
    
    const [inProp, setInProp] = useState(false);

    return(
    <CSSTransition in={inProp} timeout={200000000} 
    onMouseOver={() => setInProp(true)} 
    onMouseOut={() => setInProp(false)} 
    classNames="option">
        <div className="option">
          {props.children}
        </div>
      </CSSTransition>
    );
  };

  export default ProfileTile;