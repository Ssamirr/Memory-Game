import { useEffect, useState } from "react";

const TILE_COLORS = [
  {
    id: 1,
    color: "red"
  },
  {
    id: 2,
    color: "green"
  },
  {
    id: 3,
    color: "blue"
  },
  {
    id: 4,
    color: "yellow"
  },
  {
    id: 5,
    color: "red"
  },
  {
    id: 6,
    color: "green"
  },
  {
    id: 7,
    color: "blue"
  },
  {
    id: 8,
    color: "yellow"
  },

];


export default function Memory() {

  const [tiles, setTiles] = useState([]);
  const [foundTiles, setFoundTiles] = useState([]);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(shuffle(TILE_COLORS))
  }, [])

  // Write your code here.
  function handleColor(item) {

    setTiles([...tiles, item]);
    setCount(prev => prev + 1);

    if (count === 1) {

      if (tiles[0].color === item.color) {
        setFoundTiles([...foundTiles, tiles[0], item]);
      }

      setTimeout(() => {
        setTiles([]);
        setCount(0);
      }, [500]);

    }
  }

  const RestartGame = () => {
    setFoundTiles([]);
    setData(shuffle(TILE_COLORS));
  }

  return (
    <>
      <h1> {foundTiles.length === TILE_COLORS.length ? "You Win" : "Memory"}</h1>
      <div className="board">

        {data && data.map((item, index) => {
          return <div
            key={index}
            style={{
              background: tiles.includes(item) ? item.color : foundTiles.includes(item) ? item.color : "white",
              pointerEvents: tiles.includes(item) ? "none" : foundTiles.includes(item) ? "none" : "auto"
            }}
            className={
              `tile ${tiles.includes(item) ? item.color : foundTiles.includes(item) ? item.color : ""}`
            }
            onClick={() => handleColor(item)}></div>
        })}

      </div>
      {
        foundTiles.length === TILE_COLORS.length && <button onClick={() => RestartGame()}>Restart</button>
      }
    </>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
