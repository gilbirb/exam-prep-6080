import { useEffect, useRef, useState } from "react"

function App() {
  const [word, setWord] = useState('WORD');
  const [timer, setTimer] = useState(0);
  const [text, setText] = useState('');
  const countRef = useRef<number>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleStart = async () => {
    if (countRef.current) {
      clearInterval(countRef.current);
    }

    const res = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await res.json();
    setWord(data[0]);

    const startTime = Date.now();

    countRef.current = setInterval(() => {
      setTimer(Date.now() - startTime);
    }, 10);

    setText('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    handleStart()
  }, []);

  useEffect(() => {
    if (text === word) {
      if (countRef.current) {
        clearInterval(countRef.current);
      }
    }
  }, [text]);

  return (
    <>
      <div className="flex flex-col min-h-screen   justify-center items-center">
        <h1 className="font-bold mb-2">Please enter the following word as fast as possible</h1>
        <p className="text-xl">{word}</p>
        <input ref={inputRef} onChange={(e) => setText(e.target.value)} value={text} className="mt-3 border-zinc-950 border-2 rounded-sm text-center" type="text" />
        <button className="my-3 cursor-pointer bg-blue-500 px-3 py-1 rounded-sm text-white" onClick={handleStart}>Reset</button>
        <p>Elapsed time: {timer / 1000} seconds</p>
      </div>
    </>
  )
}

export default App
