import { Doughnut } from 'react-chartjs-2';
import React from 'react';  

interface DoughnutDiagramProps
{
  width?: number,
  data: {
    labels: string[];
    datasets: {
        label?: string;
        backgroundColor: string[];
        hoverBackgroundColor: string[];
        data: number[];
    }[];
  },
  title?: {
    display: boolean,
    text: string,
    fontSize: number
  },
  cutoutPercentage?: number,
  legend?:{
    display?:boolean,
    position?: "left" | "right" | "top" | "bottom" | "chartArea"
  }
}

const DoughnutDiagram:React.FC<DoughnutDiagramProps> = (props: DoughnutDiagramProps) => {

    return(
        <div>
            <Doughnut data={props.data} width={props.width}
            options={{
              responsive: true,
              maintainAspectRatio: true,
                title:{
                    display: props.title?.display,
                    text: props.title?.text,
                    fontSize: props.title?.fontSize
                },
                legend:{
                    display:props.legend?.display,
                    position:props.legend?.position
                },
                cutoutPercentage: props.cutoutPercentage
            }}
            />
        </div>
    );
}

export default DoughnutDiagram;