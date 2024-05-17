import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"



function App() {
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

  const updateTodo = async (id: number, done: boolean) => {
    await axios.put(`http://localhost:3000/api/todos/${id}`, { done }).then((res) => {
      setTodos(todos.map((todo) => todo.id === id ? { ...todo, done } : todo));
    });

    await callTodos();
  }

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1 className="text-3xl font-bold underline">
        SGE 2.0
      </h1>

      <form onSubmit={sendNewTodo}>
       <div>
         <label htmlFor="newTodo" className="block text-sm font-medium leading-6 text-gray-900">
          Nuevo To-Do
        </label>
        <Input
          value={todo} onChange={(e) => setTodo(e.target.value)}
          type="text"
          name="newTodo"
          id="newTodo"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Completar el Proyecto Final"
        />
        <Button onClick={sendNewTodo}>Crear</Button>
       </div>
      </form>
      <ul className="list-disc">
      {
        todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <Checkbox type='button' checked={todo.done} onClick={() => updateTodo(todo.id, !todo.done)}/>
              {todo.id} - {todo.title}
            </label>
          </li>
        ))
      }
      </ul>
    </>
  )
}

export default App
