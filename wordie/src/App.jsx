import { useState } from "react";
import { useEffect } from "react";
import { Error } from "./Error";

const DEFAULT_GUESSES = ['     ', '     ', '     ', '     ', '     '];

function App() {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState(DEFAULT_GUESSES);
  const [guess, setGuess] = useState('');
  const [numGuess, setNumGuess] = useState(0);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const url = 'https://random-word-api.herokuapp.com/word?length=5';
  const [openError, setOpenError] = useState(false);

  useEffect(() => {

    const fetchWord = async () => {
      const res = await fetch(url, { method: 'GET' });
      const word = await res.json();
      console.log(word[0]);
      setWord(word[0]);
    }

    fetchWord();
  }, []);

  const isValidGuess = (word) => word.length === 5;

  const determineColor = (letter, position) => {
    if (word[position] === letter) return 'bg-green-800';
    if (word.includes(letter)) return 'bg-yellow-300';
    return 'bg-white';
  }

  const checkWin = () => {
    if (word === guess) {
      setWin(true);
    } else if (numGuess === 4) setLose(true);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <Error cb={() => setOpenError(false)} open={openError}></Error>
        <div className="grid grid-cols-5 grid-rows-5 h-100 w-100">
          {guesses.map((r, i) => {
            return <>
              <div className={`border border-black border-solid text-center text-5xl ${determineColor(r[0], 0)}`}>{r[0]}</div>
              <div className={`border border-black border-solid text-center text-5xl ${determineColor(r[1], 1)}`}>{r[1]}</div>
              <div className={`border border-black border-solid text-center text-5xl ${determineColor(r[2], 2)}`}>{r[2]}</div>
              <div className={`border border-black border-solid text-center text-5xl ${determineColor(r[3], 3)}`}>{r[3]}</div>
              <div className={`border border-black border-solid text-center text-5xl ${determineColor(r[4], 4)}`}>{r[4]}</div>
            </>
          })}
        </div>

        {(!win && !lose) && <input
          type="text"
          className="border-black border border-solid"
          onKeyUp={(e) => {
            setGuess(e.target.value);

            if (e.key === 'Enter') {
              console.log(guess);
              if (isValidGuess(guess)) {
                const newGuesses = [...guesses];
                newGuesses[numGuess] = e.target.value;
                setNumGuess(numGuess + 1);
                setGuesses(newGuesses);
              } else {
                setOpenError(true);
              }

              e.target.value = '';
              checkWin();
            }
          }
          } />}
        {win && <><div>Congrats idiot</div></>}
        {lose && <><div>LMAO u lost the word was {word}</div></>}
      </div>
    </>
  )
}

export default App
