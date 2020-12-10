import React, { useEffect, useState } from 'react';
import Navigator from './NavigationBar';

  const drawerWidth = 256;

  // export const MenuContext = React.createContext(
  //   {
  //     rerender: false,
  //     setRerender: () => {}
  //   }
  // )

  const LeftMenu: React.FC = () => {

    // const menuContext = React.useContext(MenuContext);

    return(
        <Navigator PaperProps={{ style: { width: drawerWidth } }} />
    );
  }

  export default LeftMenu;