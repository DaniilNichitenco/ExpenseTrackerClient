import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

interface RadarDiagramProps
{
    legend?:{
        display?:boolean;
        position?: "left" | "right" | "top" | "bottom" | "chartArea";
      };
      title?: {
        display: boolean;
        text: string;
        fontSize: number;
      };
      data: {
        labels: string[];
        datasets: {
            label?: string;
            backgroundColor: string;
            pointBorderColor?: string;
            pointHoverBackgroundColor?: string;
            pointHoverBorderColor?: string;
            data: number[];
            pointBorderWidth?: number;
			pointHoverRadius?: number;
		    pointHoverBorderWidth?: number;
			pointRadius?: number;
			pointHitRadius?: number;
        }[];
      };
      width?: number;
}

const RadarDiagram: React.FC<RadarDiagramProps> = (props) => {

    return(
        <div>
            <Radar data={props.data} width={props.width}
            options={{
                title:{
                    display: props.title?.display,
                    text: props.title?.text,
                    fontSize: props.title?.fontSize
                },
                legend:{
                    display: props.legend?.display,
                    position:props.legend?.position
                }
            }}
            />
        </div>
    );
}

export default RadarDiagram;