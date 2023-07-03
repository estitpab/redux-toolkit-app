import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./feature/counter/counter-slice";
import { useFetchBreedsQuery } from "./feature/dogs/dogs-api-slice";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [numDogs, setNumDogs] = useState(10); 

  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  function increment() {
    dispatch(incremented());
  }

  function addAmount() {
    dispatch(amountAdded(5));
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increment}>Increment</button>
        <button onClick={addAmount}>Add Five</button>
        <p>
          <strong>count is {count}</strong>
        </p>
        <div>
          <p>Dogs to fetch:</p>
          <select value={numDogs} onChange={(e)=>setNumDogs(Number(e.target.value))}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
          </select>
        </div>
        <div>
          <p>Numbers of dogs fetched : {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
              <tbody>
                {data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>
                      <img
                        src={breed.image.url}
                        alt={breed.name}
                        height={250}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </thead>
          </table>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
