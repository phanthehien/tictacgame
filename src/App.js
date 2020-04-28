import React, { useState } from 'react';
import './App.css';

function App() {
  const [moves] = useState([]);

  const [steps, setSteps] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
  const [current, setCurrent] = useState(1);
  const [winner, setWinner] = useState();

  const checkWin = () => {
    let crossVertical = 0;
    let crossHorizontal = 0;
    const dimension = steps.length;

    for (let i = 0; i < dimension; i++) {
      let countHorizontal = 0;
      let countVertical = 0;

      for (let j = 0; j < dimension; j++) {
        if(steps[i][j] === current) {
          countHorizontal += 1;
        }

        if(steps[j][i] === current) {
          countVertical += 1;
        }

        if (i === j && steps[i][j] === current) {
          crossHorizontal += 1;
        }

        if ((i + j + 1) === dimension && steps[j][i] === current) {
          crossVertical += 1;
        }

        if (countVertical === dimension) { 
          return true; 
        }

        if (countHorizontal === dimension) {
          return true;
        }

        if (crossHorizontal === dimension) {
          return true;
        }

        if (crossVertical === dimension) {
          return true;
        }
      }
    }

    return false;
  }

  const checkDraw = () => {
    for (let i = 0; i < steps.length; i++) {
      for (let j = 0; j < steps.length; j++) {
        if (steps[i][j] === 0)
          return false;
      }
    }

    return true;
  }

  const handleBack = () => {
    if (moves.length > 0) {
      const previousStep = moves.pop();
      const [indexX, indexY] = previousStep;
      steps[indexX][indexY] = 0;
      setSteps([...steps]);
      setCurrent(current === 1 ? 2 : 1);
      }
  }

  const handleMove = (indexX, indexY) => () => {
    if (steps[indexX][indexY] > 0) {
      return;
    }
    steps[indexX][indexY] = current;
    moves.push([indexX, indexY])

    setSteps(steps);

    if (checkWin()) {
      setWinner(current);
      return;
    }
    
    if (checkDraw()) {
      setWinner(3);
      return;
    }

    setCurrent(current === 1 ? 2 : 1);
  }

  return (
    <div>
      { (winner > 0 && winner <= 2) && <div className="status">Winner is: {(winner === 1 ? 'X' : 'O')}</div> }
      { !winner && <div className="status">Next player: {(current === 1 ? 'X' : 'O')}</div> }
      { (winner > 2 ) && <div className="status">Draw</div> }
      <div className="board">
        { steps.map((stepsRow, indexX) => (
            <div key={`${indexX}`} className="board-row">
              { stepsRow.map((row, indexY) => <button  key={`${indexX}_${indexY}`} onClick={handleMove(indexX, indexY)} className="square">{ (row > 0) && (row === 1 ? 'X' : 'O') } </button>)}
            </div>
        ))}
      </div>
      <button disabled={moves.length === 0} onClick={handleBack}>Back</button>
    </div>
  );
}

export default App;
