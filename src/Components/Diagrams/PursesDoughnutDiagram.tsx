import React from 'react';
import DoughnutDiagram from './Generic/DoughnutDiagram';

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [65, 59, 80, 81, 56]
      }
    ]
  };

const PursesDoughnutDiagram: React.FC = () => {

    return(
        <DoughnutDiagram width={500} data={state} 
        title={{display:true, text:"Purses diagram", fontSize:20}}
        legend={{display:true, position:"top"}}
        cutoutPercentage={65}
        />
    );
}

export default PursesDoughnutDiagram;