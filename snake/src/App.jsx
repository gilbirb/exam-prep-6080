import { useEffect, useState } from "react"

const STARTING_SNAKE = [
  { x: 0, y: 0 }
]

const STARTING_FOOD = { x: 5, y: 5 };

const SIZE = 6;

function App() {
  const [snake, setSnake] = useState(STARTING_SNAKE);
  const [dir, setDir] = useState('right');
  const [start, setStart] = useState(false);
  const [food, setFood] = useState(STARTING_FOOD);
  const [lose, setLose] = useState(false);
  const [score, setScore] = useState(0);

  const getNewHead = (head) => {
    if (dir === 'right') {
      return { x: head.x + 1, y: head.y };
    }
    if (dir === 'left') {
      return { x: head.x - 1, y: head.y };
    }
    if (dir === 'up') {
      return { x: head.x, y: head.y - 1 };
    }
    if (dir === 'down') {
      return { x: head.x, y: head.y + 1 };
    }
  };

  const isOutOfBounds = (head) => {
    return head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE;
  }

  useEffect(() => {
    if (!start) return;
    if (lose) return;
    const interval = setInterval(() => {
      setSnake((oldSnake) => {
        const oldHead = oldSnake[0];
        const newHead = getNewHead(oldHead);

        if (oldSnake.some(s => sameCell(s, newHead)) || isOutOfBounds(newHead)) {
          alert('L');
          setLose(true);
          resetGame();
          return oldSnake;
        }

        let newSnake = [newHead, ...oldSnake];

        if (sameCell(food, newHead)) {
          setScore(prev => prev + 1);
          checkWin(newSnake);
          setFood(randomFood(newSnake));
        } else {
          newSnake.pop();
        }

        console.log(oldSnake);
        return newSnake;
      })
    }, 200);

    return () => clearInterval(interval);
  }, [dir, start, lose, food]);

  const randomFood = (nextSnake) => {
    while (true) {
      const newFood = {
        x: Math.floor(Math.random() * SIZE),
        y: Math.floor(Math.random() * SIZE),
      };

      const onSnake = nextSnake.some((part) => sameCell(part, newFood));
      if (!onSnake) return newFood;
    }
  }

  const checkWin = (currentSnake) => {
    if (currentSnake.length >= SIZE * SIZE) {
      alert('W');
    }
  }

  const startGame = () => {
    if (start) return;
    resetGame();
    setStart(true);
  };

  const resetGame = () => {
    setStart(false);
    setLose(false);
    setSnake(STARTING_SNAKE);
    setDir('right');
    setFood(STARTING_FOOD);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setDir(() => 'up');
      }
      if (event.key === 'ArrowLeft') {
        setDir(() => 'left');
      }
      if (event.key === 'ArrowRight') {
        setDir(() => 'right');
      }
      if (event.key === 'ArrowDown') {
        setDir(() => 'down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sameCell = (a, b) => a.x === b.x && a.y === b.y;

  const cellType = (x, y) => {
    if (snake.some(s => sameCell(s, { x, y }))) return 'snake';
    if (sameCell(food, { x, y })) return 'food';
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div>Score: {score}</div>
      <div className={`grid grid-cols-6 grid-rows-6 border-1 border-black border-solid h-200 w-200`} onClick={startGame}>
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);
          const type = cellType(x, y);

          let bgColor = 'bg-white';
          if (type === 'snake') bgColor = 'bg-green-700';
          if (type === 'food') bgColor = 'bg-red-500';

          return <div key={i} className={`border-black border-1 border-solid ${bgColor}`}>

          </div>
        })}
      </div>
      <button className="bg-gray-200 border-1 border-solid border-black cursor-pointer p-1 mt-3" onClick={resetGame}>Reset</button>
    </div>
  )
}

export default App
