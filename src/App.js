import React, { useState, useEffect } from "react";
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Ejecutar esta función una sola vez al iniciar la página
  useEffect(() => {
    getLocalTodos();
  }, []);

  //Use effect
  useEffect(() => {
    filterHandler();
    saveToLocalTodos();
  }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to local
  const saveToLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>ToDo App</h1>
        <p>Create your own list of toDo's here!</p>
      </header>
      
      <Form inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText} 
      setStatus={setStatus}
      />
      <TodoList setTodos={setTodos}
      todos={todos}
      filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
