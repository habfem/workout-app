import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';


 function App() {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState ([
    /* {
      id: 1,
      text: 'Clear the file',
      day: 'February 18th at 10:00 GMT',
      reminder: true,
  },
  
  {
      id: 2,
      text: 'Type the report',
      day: 'February 24th at 13:40 GMT',
      reminder: true,
  },

  {
      id: 3,
      text: 'Grocery shopping',
      day: 'March 1st at 18:00 pm GMT',
      reminder: false,
  }, */
  ])

  useEffect (() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  // Fetch Tasks from db.json
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch ('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify (task)
    }) 
    const data= await res.json()

    setTasks([...tasks, data])

    /* const id = Math.floor(Math.random() * 10000) + 1 //generate random number
    const newTask = { id, ...task } ///... = copy
    setTasks ([...tasks, newTask]) */
  }

  
  // Delete Task
  const deleteTask = async (id) => {
   await fetch (`http://localhost:5000/tasks/${id}`, {
     method: 'DELETE'
   }) 
   setTasks(tasks.filter((task) => task.id !==id))
  }


// toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask (id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch (`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
     headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify (updTask)
  }) 
  const data= await res.json()


  setTasks(tasks.map((task) => task.id === id ? 
  { ...task, reminder: data.reminder} : task ))
}


  return (
    <Router>

    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} 
      showAddTask ={showAddTask} />

      <Routes>
      <Route path='/'
      element={
        <>
         { showAddTask && <AddTask onAdd={addTask} /> } 
      {tasks.length > 0 ? (<Tasks tasks = {tasks}  //if task length is graeter than zero show taaks if not show 'No tasks found'
      onDelete = {deleteTask}
      onToggle={toggleReminder}/>) : ('No tasks found')}
        </>
        }
        />
    
      <Route path='/about' element={<About /> }  />
      </Routes>
      
      <Footer/>
      

    </div>
    </Router>
  );
}

export default App;