import React from 'react';
import useWindowHeight from '../../CustomHooks/WindowSizeHooks/useWindowHeight';
import './AppContentStyles.css'

const AppContent: React.FC = ({children}) => {
    const windowHeight = useWindowHeight();

    return(
        <div className="content" style={{minHeight:windowHeight}}>
            {children}
        </div>
    );
}

export default AppContent;