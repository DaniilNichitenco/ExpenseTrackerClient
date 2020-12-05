import React from 'react';
import { Bar } from 'react-chartjs-2';
import CountDays from '../../../Date/CountDays';

const data = {
	labels: Array.from({length: CountDays()}, (_, i) => i + 1),
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
			label: 'My second dataset',
			backgroundColor: 'rgba(215,19,102,0.2)',
			borderColor: 'rgba(215,19,102,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(215,19,102,0.4)',
			hoverBorderColor: 'rgba(215,19,102,1)',
			data: [60, 39, 90, 71, 46, 35, 70]
        },
        {
			label: 'My third dataset',
			backgroundColor: 'rgba(215,19,102,0.8)',
			borderColor: 'rgba(215,19,102,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(215,19,102,1)',
			hoverBorderColor: 'rgba(215,19,102,1)',
			data: [60, 39, 90, 71, 46, 35, 70]
		}
	]
};

export const BarDiagram: React.FC = () => {

    return(
        <React.Fragment>
            <div>
                <Bar data={data} />
            </div>
        </React.Fragment>
    );
} 

export default BarDiagram;