import React from 'react';
import PursesData from '../Data/PursesData';
import PurseData from '../Data/PurseData';

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

const data: PursesData = {
  purses: [purse1, purse2, purse3],
  count: 3
}

const PursesContext = React.createContext({
    pursesData: data,
    setPursesData: (pursesData: PursesData) => {},
    getCurrecyCodes: ():string[] => { return ["MDL", "USD", "EUR"];},
    getBills: ():number[] => {return [1000, 2000, 3000]}
});

export default PursesContext;