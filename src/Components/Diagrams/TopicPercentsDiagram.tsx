 import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import PercentsTopicExpense from '../../Data/Models/Expenses/PercentsTopicExpense';
import { GetPercentsExpensesPerTopic } from '../../Services/expense.service/ExpenseService';
import RadarDiagram from './Generic/RadarDiagram';

const randomColor = require('random-color');

export const TopicPercentsDiagram: React.FC = () => {

	const [isLoading, setIsLoading] = useState(true);
    const [percentsTopic, setPercentsTopic] = useSessionStorage<PercentsTopicExpense[]>("percentsTopic", []);

	useEffect(() => {
		GetPercentsExpensesPerTopic()
			.then(res => {
				if(res.response.status == 200)
				{
					setPercentsTopic([...res.data]);
					setIsLoading(false);
				}
			});
	}, []);

	const getData = () => {
		let datasets:any[] = [];
		
		for (const percent of percentsTopic) 
		{
			let color = randomColor(0.99, 0.99);
			let color2 = randomColor(0.99, 0.99);
  
			let percents: number[] = [];

			percent.percents.forEach(p => {
				percents.push(p.sum);
			});
		  
  
		  datasets.push(
			{
			  label: percent.currencyCode.toUpperCase(),
			  data: percents,
			  lineTension: 0.1,
			  fill: false,
			  backgroundColor: color.rgbString(),
			  borderColor: color.rgbString(),
			  pointBackgroundColor: color.rgbString(),
			  pointHoverBorderColor: color2.rgbString(),
			  pointHoverBackgroundColor: color2.rgbString(),
			  pointBorderColor: color.rgbString(),
			  pointBorderWidth: 2,
			  pointHoverRadius: 9,
			  pointHoverBorderWidth: 2,
			  pointRadius: 4,
			  pointHitRadius: 10,
			  }
		  )
		}

		const topics: string[] = [];

		percentsTopic[0].percents.forEach(p => {
			topics.push(p.topic);
		})
  
		const data = {
		  labels: topics,
		  datasets: datasets
		}
  
		return data;
	  }

	if(isLoading)
    {
      return (
		<Grid container xs={12} justify="center">
			<CircularProgress color="secondary" />
		</Grid>
		);
    }	

    return (<RadarDiagram data={getData()} title={{
		display: true,
		text: "Percentage expenses",
		fontSize: 20
	}} legend={{
		display: true,
		position: "right"
	}} />);
}

export default TopicPercentsDiagram;