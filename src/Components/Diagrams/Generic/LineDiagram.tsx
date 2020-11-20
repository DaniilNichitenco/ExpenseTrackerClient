import { Line } from 'react-chartjs-2';
import React, { useContext, useEffect } from 'react';
import PursesContext from '../../../Context/PursesContext';

const randomColor = require('random-color');

  const LineDiagram:React.FC = (props:any) => {

    const pursesContext = useContext(PursesContext);

    let dataset:any[];
    useEffect(() => {
      props.getExpenses(props.time, props.code);
      
      pursesContext.pursesData.purses.forEach(p => {
        let color = randomColor(0.99, 0.99);
        
        
      });

    },[]);

    const state = {
      labels: props.time,
      datasets: [
        {
      label: 'Rainfall',
      data: [0, 59, 80, 81, 56],
      lineTension: 0.1,
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 9,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
        },
        {
          label: 'Test',
          data: [0, 15, 9, 40, 35],
          lineTension: 0.1,
          fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'red',
      pointBorderWidth: 2,
      pointHoverRadius: 9,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
        }
      ]
    };

    return(
        <div>
            <Line data={state}
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

  export default LineDiagram;