import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const [todos, setTodos] = useState<{ title: string, done: boolean, id: number }[]>([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
   callTodos();
  }, [])

  const callTodos = async () => {
    await axios.get('http://localhost:3000/api/todos').then((res) => {
      setTodo('');
      setTodos(res.data);
    });
  }

  const sendNewTodo = async (e: any) => {
    e.preventDefault();

    await axios.post('http://localhost:3000/api/todos', { title: todo }).then((res) => {
      setTodos([...todos, res.data]);
    });

    await callTodos();
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <form onSubmit={sendNewTodo}>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
      </form>
      {
        todos.map((todo) => (
          <div key={todo.id}>
            <label>
               <input type="checkbox" defaultChecked={todo.done}/>
              {todo.title}
            </label>
          </div>
        ))
      }
    </>
  )
}

export default App
