 import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getColor } from '../../Colors/colors';
import useSessionStorage from '../../CustomHooks/StorageHooks/useSessionStorage';
import PercentsTopicExpense from '../../Data/Models/Expenses/PercentsTopicExpense';
import { getPercentsExpensesPerTopic } from '../../Services/expense.service/ExpenseService';
import RadarDiagram from './Generic/RadarDiagram';

export const TopicPercentsDiagram: React.FC = () => {

	const [isLoading, setIsLoading] = useState(true);
    const [percentsTopic, setPercentsTopic] = useSessionStorage<PercentsTopicExpense[]>("percentsTopic", []);

	useEffect(() => {
		getPercentsExpensesPerTopic()
			.then(res => {
				if(res.response.status == 200)
				{
					setPercentsTopic([...res.data]);
					setIsLoading(false);
				}
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const getData = () => {
		let datasets:any[] = [];
		
		percentsTopic.forEach((percent, index) => {
			let color = getColor(index);
  
			let percents: number[] = [];

			percent.percents.forEach(p => {
				percents.push(Number(p.sum.toFixed(2)));
			});
		  
  
		  datasets.push(
			{
			  label: percent.currencyCode.toUpperCase(),
			  data: percents,
			  lineTension: 0.1,
			  fill: false,
			  backgroundColor: color,
			  borderColor: color,
			  pointBackgroundColor: color,
			  pointHoverBorderColor: color,
			  pointHoverBackgroundColor: color,
			  pointBorderColor: color,
			  pointBorderWidth: 2,
			  pointHoverRadius: 9,
			  pointHoverBorderWidth: 2,
			  pointRadius: 4,
			  pointHitRadius: 10,
			  }
		  )
		})

		const topics: string[] = [];

		if(percentsTopic.length != 0)
		{
			percentsTopic[0].percents.forEach(p => {
				topics.push(p.topic);
			});
		}
  
		const data = {
		  labels: topics,
		  datasets: datasets
		}
  
		return data;
	  }

	if(isLoading)
    {
      return (
		<Grid container justify="center">
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