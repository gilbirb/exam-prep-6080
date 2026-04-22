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

  const play = (x: number, y: number) => {
    if (grid[x][y] !== '') return;

    const newGrid = [...grid];
    newGrid[x][y] = playing;
    setPlaying(playing === 'x' ? 'o' : 'x');
    setGrid(newGrid);
  };

  const resetCallback = () => {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
  };

  return (
    <div className="min-w-max flex flex-col justify-center items-center">
      {grid.map((box, idx) => {
        return (
          <div className="flex">
            <div className="cursor-pointer w-50 h-50 border-black border-2 inline-flex justify-center items-center" onClick={() => play(idx, 0)}>{box[0]}</div>
            <div className="cursor-pointer w-50 h-50 border-black border-2 inline-flex justify-center items-center" onClick={() => play(idx, 1)}>{box[1]}</div>
            <div className="cursor-pointer w-50 h-50 border-black border-2 inline-flex justify-center items-center" onClick={() => play(idx, 2)}>{box[2]}</div>
          </div>
        )
      })}
      <button className="my-5 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={resetCallback}>Reset</button>
    </div>
  )
}

export default App
