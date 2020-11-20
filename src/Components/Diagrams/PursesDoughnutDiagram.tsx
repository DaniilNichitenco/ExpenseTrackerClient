import React, { useContext, useState } from 'react';
import PursesContext from '../../Context/PursesContext';
import DoughnutDiagram from './Generic/DoughnutDiagram';

const PursesDoughnutDiagram: React.FC = () => {
  
  const pursesContext = useContext(PursesContext);

  const state = {
    labels: pursesContext.getCurrecyCodes(),
    datasets: [
      {
        label: 'Purses',
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
        borderColor: 'rgba(75,192,192,1)',
      },
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