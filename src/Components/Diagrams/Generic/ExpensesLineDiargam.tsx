import { Line } from 'react-chartjs-2';
import React from 'react';
import Wallet from '../../../Data/Models/Wallets/Wallet';

  interface ExpensesLineDiagramProps
  {
    paddingLeft?: number,
    paddingRight?: number,
    paddingBottom?: number,
    paddingTop?: number,
    width?: number,
    height?: number
    data: {
      labels: string[],
      datasets: any[]
    },
    title: string
  }
  

  const ExpensesLineDiagram:React.FC<ExpensesLineDiagramProps> = (props) => {

    return(
        <div>
            <Line data={props.data}
            height={300}
            width={600}
            options={{
                title:{
                    display:true,
                    text:props.title,
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