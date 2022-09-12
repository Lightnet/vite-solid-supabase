/*
  Project Name: vite-solid-supabase
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createSignal, For } from 'solid-js'
import { supabase } from '../libs/supabaseclient'

//import PublicChat from "../components/publicchat/PublicChat";
import { useAuth } from '../components/auth/AuthProvider';

function PageToDoList(){

  const [todos, setTodos] = createSignal([]);
  const [newTask, setNewTask] = createSignal("");
  const [errorText, setError] = createSignal("");
  const [session] = useAuth();

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    
    else setTodos(todos);
    console.log(todos)
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodos(state=> state.filter((x) => x.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  const addTodo = async () => {
    let taskText = newTask();
    let task = taskText.trim();
    const user = session().user;
    //console.log(user)

    if (task.length <= 3) {
      setError("Task length should be more than 3!");
    } else {
      let { data: todo, error } = await supabase
        .from("todos")
        .insert({ task, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else {
        setTodos(state=>[...state,todo])
        //console.log(todo)
        //setTodos([todo, ...todos]);
        setError("");
        setNewTask("")
      }
    }
  };

  
  fetchTodos();

  function inputNewTask(e){
    setNewTask(e.target.value)
  }

  return (<>
    <label>ToDoList</label>
    <input value={newTask()} onInput={inputNewTask} /><button onClick={addTodo}>Add</button>
    <label>{errorText()}</label>
    <div>
      <For each={todos()} fallback={<div>Loading...</div>}>
      {(item, index) => (
        <div id={index()}>
          <label > Item: {item.task} </label>
          <button onClick={()=>deleteTodo(item.id)}> Del </button>
        </div>
      )}
      </For>
    </div>
  </>)
}

export default PageToDoList;