import { Line } from 'react-chartjs-2';
import React from 'react';
import Purse from '../../Data/Models/Purses/Purse';
//Math.random() * (max - min) + min;

const randomColor = require('random-color');

const getPurses = () => {

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

  getPurses().forEach(p => {

    let color = randomColor(0.99, 0.99);

    datasets.push(
      {
        label: p.currencyCode.toUpperCase(),
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

  interface ExpensesLineDiagramProps
  {
    paddingLeft?: number,
    paddingRight?: number,
    paddingBottom?: number,
    paddingTop?: number,
    width?: number,
  }
  

  const ExpensesLineDiagram:React.FC<ExpensesLineDiagramProps> = (props) => {

    return(
        <div style={{
          paddingLeft: props.paddingLeft,
          paddingRight: props.paddingRight,
          paddingTop: props.paddingTop,
          paddingBottom: props.paddingBottom,
          width: props.width,
        }}>
            <Line data={getState()}
            width={400}
            options={{
                title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
            }}
            />
        </div>
    );
  }

  export default ExpensesLineDiagram;