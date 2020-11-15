import { makeStyles } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react';
import './AppContentStyles.css'

const useWindowHeight = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight); 

    useLayoutEffect(() => {
        const updateHeight = () => {
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener("resize", updateHeight);
        updateHeight();
        return () => window.removeEventListener("resize", updateHeight);
    }, []);
    return windowHeight;
}

const AppContent: React.FC = ({children}) => {
    const windowHeight = useWindowHeight();

    return(
        <div className="content" style={{minHeight:windowHeight}}>
            {children}
        </div>
    );
}

export default AppContent;