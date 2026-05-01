import { useEffect, useState } from "react"

function App() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const validOperators = ['*', '-', '+'];

  const checkInvalid = () => {
    if (first === '' || second === '' || third === '') return false;

    if (isNaN(first) || isNaN(third)) {
      return false;
    }
    if (!validOperators.includes(second)) {
      return false;
    }
    return true;
  }

  const calculate = () => {
    console.log(first, second, third);
    if (!checkInvalid()) return;
    let result;
    if (second === '*') {
      result = Number(first) * Number(third);
    }
    if (second === '+') {
      result = Number(first) + Number(third);
    }
    if (second === '-') {
      result = Number(first) - Number(third);
    }

    setFourth(String(result));
  }

  useEffect(calculate, [first, second, third]);

  return (
    <>
      <div className="flex">
        <div className="h-screen w-[25vw] bg-[#aaa] flex justify-center items-center">
          <input type="text" className="w-50 h-50 text-2xl border text-center" value={first} onChange={(e) => { setFirst(e.target.value); }} />
        </div>
        <div className="h-screen w-[25vw] bg-[#ccc] flex justify-center items-center">
          <input type="text" placeholder="*" className="w-50 h-50 text-2xl border text-center" value={second} onChange={(e) => { setSecond(e.target.value); }} />
        </div>
        <div className="h-screen w-[25vw] bg-[#aaa] flex justify-center items-center">
          <input type="text" className="w-50 h-50 text-2xl border text-center" value={third} onChange={(e) => { setThird(e.target.value); }} />
        </div>
        <div className="h-screen w-[25vw] bg-[#ccc] flex justify-center items-center">
          <input type="text" className="w-50 h-50 text-2xl border text-center bg-[green]" disabled value={fourth} />
        </div>
      </div>
    </>
  )
}

export default App
