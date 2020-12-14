import React, { useEffect } from 'react';
import {
    Route, Redirect, Switch, useHistory
  } from "react-router-dom";
import { getCurrentUser } from '../Services/auth.services/auth-service';
import UsersPage from '../Components/Pages/UsersPage';
import jwt_decode from 'jwt-decode';

  const AdminRouter:React.FC = () => {

      const history = useHistory();
      const token = getCurrentUser().accessToken;

      useEffect(() => {
        const role: string = (jwt_decode(token) as any).Role;
        if(role != "admin")
        {
            history.push('au/home');
        }
    }, []);

    return(
        <Switch>
            <Route exact path="/au/admin/users" component={UsersPage} />
            <Redirect to="/au/admin/users" />
        </Switch>
    );
  }

  export default AdminRouter;