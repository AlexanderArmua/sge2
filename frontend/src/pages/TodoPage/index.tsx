import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import { Todo } from "../interfaces/ITodo";
import { todoService } from "./service/TodoService";

const service = todoService;

export const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    callTodos();
  }, []);

  const callTodos = async () => {
    const todos = await service.getTodos();

    console.log(todos);

    setTodos(todos);
    setFilterText("");
  };

  const sendNewTodo = async (e: FormEvent) => {
    e.preventDefault();

    await service.createTodo({
      title: filterText,
      done: false,
    });

    await callTodos();
  };

  const updateTodo = async (id: number, done: boolean) => {
    await service.updateTodo(id, { done });

    await callTodos();
  };

  return (
    <>
      <form onSubmit={sendNewTodo}>
        <div>
          <label
            htmlFor="newTodo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nuevo To-Do
          </label>
          <Input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
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
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <Checkbox
                type="button"
                checked={todo.done}
                onClick={() => updateTodo(todo.id, !todo.done)}
              />
              {todo.id} - {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};
