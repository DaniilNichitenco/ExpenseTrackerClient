import React from 'react';
import Navigator from './NavigationBar';

  const drawerWidth = 256;

  const LeftMenu: React.FC = () => {

    return(
        <Navigator PaperProps={{ style: { width: drawerWidth } }} />
    );
  }

  export default LeftMenu;