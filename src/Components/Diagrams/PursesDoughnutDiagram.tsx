import React, { useContext, useState } from 'react';
import DoughnutDiagram from './Generic/DoughnutDiagram';

interface PursesDoughnutDiagramProps
{
  labels: string[],
  data: number[],
  title?: string
}

const PursesDoughnutDiagram: React.FC<PursesDoughnutDiagramProps> = (props) => {
  
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
          '#03A600',
          '#DD0000'
        ],
        hoverBackgroundColor: [
        '#39FE12',
        '#FF1010'
        ],
        data: props.data,
        borderColor: '#1E1818',
        borderWidth: 1
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