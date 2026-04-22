import { useState } from "react"

function App() {

  const [grid, setGrid] = useState(
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  )

  return (
    <div className="min-w-max flex flex-col justify-center items-center">
      {grid.map((box, idx) => {
        return (
          <div className="flex">
            <div className="w-50 h-50 border-black border-2 inline-flex justify-center items-center">{box[0]}</div>
            <div className="w-50 h-50 border-black border-2 inline-flex justify-center items-center">{box[1]}</div>
            <div className="w-50 h-50 border-black border-2 inline-flex justify-center items-center">{box[2]}</div>
          </div>
        )
      })}
    </div>
  )
}

export default App
