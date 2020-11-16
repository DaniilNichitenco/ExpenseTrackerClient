import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'My First dataset',
			backgroundColor: 'rgba(179,181,198,0.2)',
			borderColor: 'rgba(179,181,198,1)',
			pointBackgroundColor: 'rgba(179,181,198,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(179,181,198,1)',
			data: [65, 59, 90, 81, 56]
		},
		{
			label: 'My Second dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			pointBackgroundColor: 'rgba(255,99,132,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255,99,132,1)',
			data: [28, 48, 40, 19, 100]
		}

    ]
  };

const RadarDiagram: React.FC = () => {

    return(
        <div>
            <Radar data={state} 
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

export default RadarDiagram;