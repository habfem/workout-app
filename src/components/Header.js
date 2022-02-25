import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, onAdd, showAddTask}) => {
  const location = useLocation()

  return(
      
       <header className='header'>
        <h1>{title}</h1>

        {location.pathname === '/' && 
        (<Button color = {showAddTask ? 'red' : 'rgb(55, 60, 131)'}  
        text={showAddTask ? 'Close' : 'Add'} onClick={onAdd} />)}
        {/* <Button color ='gray' text='Hi 1'/>
        <Button color ='blue' text='Hi 2'/> */}
      </header> 
  )
}

Header.defaultProps = {
  title: 'Task Manager'
}

/*To make sure the header is a string*/
  Header.propTypes = {
  title: PropTypes.string.isRequired,
} 
//CSS in JS
/*const headingStyle = {
  color:'blue',
  backgroundColor: 'grey'

}*/
export default Header;
