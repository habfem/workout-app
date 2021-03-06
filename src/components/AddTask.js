import { useState } from 'react'
import React from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState ('')
    const [day, setDay] = useState ('')
    const [reminder, setReminder] = useState (false)

    const onSubmit= (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
            return
        }
        if(!day) {
            alert('Please add day')
            return
        }

        onAdd({ text, day, reminder })

        //to clear form after task has been saved
        setText ('')
        setDay ('')
        setReminder(false)
    }

  return (
     
    <form className='add-form' onSubmit={onSubmit} >
        <div className='form-control'>
            <label>Task</label>
            <input type= 'text' placeholder='Add Task' 
            value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div className='form-control'>
            <label>Day </label>
            <input type= 'date' placeholder='Add Day and Time'
            value={day} onChange={(e) => setDay(e.target.value)} />
        </div> 

        <div className='form-control form-control-check'>
            <label>Completed</label>
            <input type= 'checkbox' checked = {reminder}
            value={reminder} onChange={(e) => 
            setReminder(e.currentTarget.checked)} />
        </div>
        

        <input type='submit' value='Save Task' className='btn btn-block'/>
    </form>
  )
}

export default AddTask
