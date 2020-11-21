import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Redirect
  } from "react-router-dom";
import SignUpPage from '../Components/Pages/SignUpPage';
import UnauthorizedPage from '../Components/Pages/UnauthorizedPage';
import PursesContext from '../Context/PursesContext';
import UserContext from '../Context/UserContext';
import PurseData from '../Data/PurseData';
import PursesData from '../Data/PursesData';
import UserData from '../Data/UserData';
import AuthorizedRouter from './AutorizedRouter';
import UnauthorizedRouter from './UnauthorizedRouter';


  const MainRouter: React.FC = () => {

    const [userData, setUserData] = useState(uData);
    const [pursesData, setPursesData] = useState(pData);

    return(
        <Router>
            <UserContext.Provider value={{userData:userData, setUserData:setUserData}}>
              <PursesContext.Provider value={{pursesData:pursesData, 
                setPursesData:setPursesData, getCurrecyCodes:getCurrencyCodes,
                getBills:getBills}}>
                <Switch>
                  <Route path="/au" component={AuthorizedRouter} />
                  <Route component={UnauthorizedRouter} />
                </Switch>
              </PursesContext.Provider>
            </UserContext.Provider>
        </Router>
    );
  }

  export default MainRouter;

const uData: UserData = {
  userId: 2,
  firstName: 'FirstName',
  lastName: 'LastName',
  email: "user@gmail.com",
  username: "user179",
  coutOccations: 0,
  countNotes: 0,
  textStatus: " "
}

const purse1: PurseData = {
  currencyCode: "MDL",
  bill: 1000
};
const purse2: PurseData = {
currencyCode: "USD",
bill: 2000
};
const purse3: PurseData = {
currencyCode: "EUR",
bill: 3000
};

const pData: PursesData = {
purses: [purse1, purse2, purse3],
count: 3
}

const getCurrencyCodes = ():string[] => {
  let currencyCodes: string[] = [];
  pData.purses.forEach(p => currencyCodes.push(p.currencyCode));
  return currencyCodes;
}
const getBills = ():number[] => {
  let bills:number[] = [];
  pData.purses.forEach(p => bills.push(p.bill));
  return bills;
}