import React from 'react'
import Proptypes from 'prop-types'

const Button = ({color, text, onClick}) => {
  return (
  
        <button onClick={onClick} 
        style= {{backgroundColor: color}}
        className='btn'>{text}
        </button>
   
  )
}


Button.defaultProps ={
  color:'steelblue' /*Default color when there is no color*/ 
}

Button.propTypes = {
  text: Proptypes.string,
  /*color: Proptypes.string,*/
  onClick: Proptypes.func
}

export default Button