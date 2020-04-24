import React, { useState } from 'react';
import './App.css';

function App() {

  const [steps, setSteps] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
  const [current, setCurrent] = useState(1);

  const checkWin = () => {
    let cross = 0;
    

    for (let i = 0; i < steps.length; i++) {
      let countHorizontal = 0;
      let countVertical = 0;

      for (let j = 0; j < steps.length; j++) {
        if(steps[i][j] === current) {
          countHorizontal += 1;
        }

        if(steps[j][i] === current) {
          countVertical += 1;
        }

        if (countVertical === steps.length) { 
          return true; 
        }

        if (countHorizontal === steps.length) {
          return true;
        }
      }
    }

    if (steps[0][0] === steps[1][1] === steps[2][2] === current) {
      return true;
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


  const handleMove = (indexX, indexY) => () => {
    steps[indexX][indexY] = current;
    setSteps(steps);
    checkWin() && alert('win');
    checkDraw() && alert('draw');
    setCurrent(current === 1 ? 2 : 1);
  }

  return (
    <div>
      <div class="status">Next player: {(current === 1 ? 'X' : 'O')}</div>
      <div class="board">
        { 
          steps.map((stepsRow, indexX) => (
            <div class="board-row">
              { stepsRow.map((row, indexY) => <button onClick={handleMove(indexX, indexY)} class="square">{ (row > 0) && (row === 1 ? 'X' : 'O') } </button>)}
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
