import React from "react";
import Purse from "../../Data/Models/Purses/Purse";
import ExpensesLineDiagram from "./Generic/ExpensesLineDiargam";


const randomColor = require('random-color');

const getExpenses = () => {

  let purses:Purse[] = [
    {
      id:1,
      bill: 1000,
      currencyCode: 'usd',
    },
    {
      id:2,
      bill: 2000,
      currencyCode: 'usd',
    },
    {
      id:1,
      bill: 3000,
      currencyCode: 'usd',
    }
  ]
  return purses;
}

const getState = () => {
  
  let datasets:any[] = [];
  const getRandomNumber = (min = 0, max = 100) => {
    return Math.random() * (max - min) + min;
  }

  getExpenses().forEach(e => {

    let color = randomColor(0.99, 0.99);

    datasets.push(
      {
        label: e.currencyCode.toUpperCase(),
        data: [
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(), 
          getRandomNumber(),
        ],
        lineTension: 0.1,
        fill: false,
        backgroundColor: color.rgbString(),
        borderColor: color.rgbString(),
        pointBorderColor: color.rgbString(),
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 9,
        pointHoverBackgroundColor: color.rgbString(),
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
          }
    )
  });

  const state2= {
    labels: [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September', 'October',
      'November', 'December'
            ],
    datasets: datasets
  }

  return state2;
}

interface ExpensesPerMonthLineDiagramProps
  {
    paddingLeft?: number,
    paddingRight?: number,
    paddingBottom?: number,
    paddingTop?: number,
    width?: number,
  }
  

  const ExpensesPerMonthLineDiagram:React.FC<ExpensesPerMonthLineDiagramProps> = (props) => {

    return(
        <ExpensesLineDiagram 
        data={getState()}
        paddingBottom={props.paddingBottom}
        paddingLeft={props.paddingLeft}
        paddingRight={props.paddingRight}
        paddingTop={props.paddingTop}
        />
    );
  }

  export default ExpensesPerMonthLineDiagram;