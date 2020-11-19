import React, { useContext, useState } from 'react';
import PursesContext from '../../Context/PursesContext';
import DoughnutDiagram from './Generic/DoughnutDiagram';

const PursesDoughnutDiagram: React.FC = () => {
  
  const pursesContext = useContext(PursesContext);

  const state = {
    labels: pursesContext.getCurrecyCodes(),
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
        data: pursesContext.getBills(),
      }
    ]
  };


  const [diagram, setDiagram] = useState(state);

    return(
        <DoughnutDiagram width={500} data={diagram} 
        title={{display:true, text:"Purses diagram", fontSize:20}}
        legend={{display:true, position:"top"}}
        cutoutPercentage={65}
        />
    );
}

export default PursesDoughnutDiagram;