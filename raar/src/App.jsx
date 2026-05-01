import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [n, setN] = useState(0);


  return (
    <>
      <div className="flex min-h-screen justify-center items-center" onClick={() => setN(n + 1)}>
        <div className={`grid border border-black border-solid`} style={{ gridTemplateRows: `repeat(${2 ** n}, minmax(0, 1fr))`, gridTemplateColumns: `repeat(${2 ** n}, minmax(0, 1fr))` }}>
          {Array.from({ length: 2 ** n * 2 ** n }).map((_, i) => {
            return <img src="./src/assets/raul.jpeg" alt="THE RAUL" className="inline" style={{ height: `calc(100vh/${2 ** n})` }} />
          })}
        </div>
      </div>
    </>
  )
}

export default App
