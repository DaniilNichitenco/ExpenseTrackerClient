import { Line } from 'react-chartjs-2';
import React from 'react';
import Purse from '../../../Data/Models/Purses/Purse';

  interface ExpensesLineDiagramProps
  {
    paddingLeft?: number,
    paddingRight?: number,
    paddingBottom?: number,
    paddingTop?: number,
    width?: number,
    data: {
      labels: string[],
      datasets: any[]
    }
  }
  

  const ExpensesLineDiagram:React.FC<ExpensesLineDiagramProps> = (props) => {

    return(
        <div style={{
          paddingLeft: props.paddingLeft,
          paddingRight: props.paddingRight,
          paddingTop: props.paddingTop,
          paddingBottom: props.paddingBottom,
          width: props.width,
        }}>
            <Line data={props.data}
            width={400}
            options={{
                title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
            }}
            />
        </div>
    );
  }

  export default ExpensesLineDiagram;