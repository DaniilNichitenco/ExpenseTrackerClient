import React from 'react';
import { Bar } from 'react-chartjs-2';

interface ExpensesPerDaysDiagramProps
{
    width?: number;
    title?: {
        display: boolean;
        text: string;
        fontSize: number;
      };
    legend?:{
        display?:boolean;
        position?: "left" | "right" | "top" | "bottom" | "chartArea";
    };
    data:{
        labels: any[],
        datasets: {
            label: string;
	        backgroundColor: string
	        borderColor: string;
	        borderWidth: number;
	        hoverBackgroundColor: string;
	        hoverBorderColor: string;
	        data: number[];
        }[]
    } 
}

export const BarDiagram: React.FC<ExpensesPerDaysDiagramProps> = (props) => {

    return(
        <React.Fragment>
            <div>
                <Bar data={props.data} options={{
                title:{
                    display: props.title?.display,
                    text: props.title?.text,
                    fontSize: props.title?.fontSize
                },
                legend:{
                    display: props.legend?.display,
                    position:props.legend?.position
                }
            }}/>
            </div>
        </React.Fragment>
    );
} 

export default BarDiagram;