import { useState } from "react"

function App() {

  const [grid, setGrid] = useState(
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  );
  const [playing, setPlaying] = useState('x'); // player x goes first
  const [winner, setWinner] = useState('');

  const play = (x: number, y: number) => {
    if (winner !== '') return;
    if (grid[x][y] !== '') return;

    const newGrid = [...grid];
    newGrid[x][y] = playing;
    setPlaying(playing === 'x' ? 'o' : 'x');
    setGrid(newGrid);

    const possibleWinner = checkWinner();
    if (possibleWinner !== '') {
      setWinner(possibleWinner);
    }
  };

  const resetCallback = () => {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setWinner('');
    setPlaying('x');
  };

  const checkWinForPlayer = (player: string) => {
    if ([grid[0][0], grid[0][1], grid[0][2]].every(b => b === player)) {
      changeWinningBoxes(0, 0, 0, 1, 0, 2, player);
      return true;
    }
    if ([grid[1][0], grid[1][1], grid[1][2]].every(b => b === player)) {
      changeWinningBoxes(1, 0, 1, 1, 1, 2, player);
      return true;
    }
    if ([grid[2][0], grid[2][1], grid[2][2]].every(b => b === player)) {
      changeWinningBoxes(2, 0, 2, 1, 2, 2, player);
      return true;
    }
    if ([grid[0][0], grid[1][0], grid[2][0]].every(b => b === player)) {
      changeWinningBoxes(0, 0, 1, 0, 2, 0, player);
      return true;
    }
    if ([grid[0][1], grid[1][1], grid[2][1]].every(b => b === player)) {
      changeWinningBoxes(0, 1, 1, 1, 2, 1, player);
      return true;
    }
    if ([grid[0][2], grid[1][2], grid[2][2]].every(b => b === player)) {
      changeWinningBoxes(0, 2, 1, 2, 2, 2, player);
      return true;
    }
    if ([grid[0][0], grid[1][1], grid[2][2]].every(b => b === player)) {
      changeWinningBoxes(0, 0, 1, 1, 2, 2, player);
      return true;
    }
    if ([grid[0][2], grid[1][1], grid[2][0]].every(b => b === player)) {
      changeWinningBoxes(0, 2, 1, 1, 2, 0, player);
      return true;
    }
    return false;
  };

  const changeWinningBoxes = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, player: string) => {
    const newGrid = [...grid];
    newGrid[x1][y1] = player.toUpperCase();
    newGrid[x2][y2] = player.toUpperCase();
    newGrid[x3][y3] = player.toUpperCase();
    setGrid(newGrid);
  };

  const checkWinner = () => {
    if (checkWinForPlayer('x')) return 'x';
    if (checkWinForPlayer('o')) return 'o';
    return '';
  }

  return (
    <div className="min-w-max flex flex-col justify-center items-center">
      {grid.map((box, idx) => {
        return (
          <div key={idx} className="flex">
            <div className={`cursor-pointer w-50 h-50 border-black border-2 inline-flex justify-center items-center ${box[0] === box[0].toUpperCase() && box[0] !== '' ? "bg-green-700" : ""}`} onClick={() => play(idx, 0)}>{box[0]}</div>
            <div className={`cursor-pointer w-50 h-50 border-black border-2 inline-flex justify-center items-center ${box[1] === box[1].toUpperCase() && box[1] !== '' ? "bg-green-700" : ""}`} onClick={() => play(idx, 1)}>{box[1]}</div>
            <div className={`cursor-pointer w-50 h-50 border-black border-2 inline-flex justify-center items-center ${box[2] === box[2].toUpperCase() && box[2] !== '' ? "bg-green-700" : ""}`} onClick={() => play(idx, 2)}>{box[2]}</div>
          </div>
        )
      })}
      {winner !== '' && (
        <>
          <p>Winner: {winner}</p>
        </>
      )}
      <button className="my-5 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={resetCallback}>Reset</button>
    </div>
  )
}

export default App
