import React, { useContext, useState } from 'react';
import PursesContext from '../../Context/PursesContext';
import DoughnutDiagram from './Generic/DoughnutDiagram';

interface PursesDoughnutDiagramProps
{
  labels: string[],
  data: number[],
  title?: string
}

const PursesDoughnutDiagram: React.FC<PursesDoughnutDiagramProps> = (props) => {
  
  const pursesContext = useContext(PursesContext);
  let title: string = "Purses diagram";
  if(props.title != undefined)
  {
    title = props.title;
  }

  const state = {
    labels: props.labels,
    datasets: [
      {
        label: 'Purses',
        backgroundColor: [
          '#1C9E14',
          '#CC0909',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#1CC917',
        '#F40808',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: props.data,
        borderColor: '#1E1818'
      },
    ]
  };


  const [diagram, setDiagram] = useState(state);

    return(
        <DoughnutDiagram width={500} data={diagram} 
        title={{display:true, text:title, fontSize:20}}
        legend={{display:true, position:"top"}}
        cutoutPercentage={65}
        />
    );
}

export default PursesDoughnutDiagram;