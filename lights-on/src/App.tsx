import { useState } from "react"

function App() {

  const random = () => Math.random() < 0.5;

  const [grid, setGrid] = useState(
    [
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()]
    ]
  );

  const resetCallback = () => {
    setGrid([
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()],
      [random(), random(), random(), random(), random(), random()]
    ]);
  };

  const play = (x: number, y: number) => {
    const newGrid = [...grid];
    const adjacentBoxes = [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]];
    newGrid[x][y] = !newGrid[x][y];

    for (const adj of adjacentBoxes) {
      if (outOfBounds(adj[0], adj[1])) continue;
      const val = newGrid[adj[0]][adj[1]];
      newGrid[adj[0]][adj[1]] = !val;
    }
    setGrid(newGrid);
  };

  const outOfBounds = (x: number, y: number) => {
    return x < 0 || x > 4 || y < 0 || y > 4;
  };

  return (
    <div className="min-w-max flex flex-col justify-center items-center">
      {grid.map((box, idx) => {
        return (
          <div key={idx} className="flex">
            <div className={`cursor-pointer w-30 h-30 border-black border-2 inline-flex justify-center items-center ${box[0] ? "bg-green-700" : ""}`} onClick={() => play(idx, 0)}></div>
            <div className={`cursor-pointer w-30 h-30 border-black border-2 inline-flex justify-center items-center ${box[1] ? "bg-green-700" : ""}`} onClick={() => play(idx, 1)}></div>
            <div className={`cursor-pointer w-30 h-30 border-black border-2 inline-flex justify-center items-center ${box[2] ? "bg-green-700" : ""}`} onClick={() => play(idx, 2)}></div>
            <div className={`cursor-pointer w-30 h-30 border-black border-2 inline-flex justify-center items-center ${box[3] ? "bg-green-700" : ""}`} onClick={() => play(idx, 3)}></div>
            <div className={`cursor-pointer w-30 h-30 border-black border-2 inline-flex justify-center items-center ${box[4] ? "bg-green-700" : ""}`} onClick={() => play(idx, 4)}></div>
          </div>
        )
      })}
      <button className="my-5 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={resetCallback}>Reset</button>
    </div>
  )
}

export default App
