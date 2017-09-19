import React from 'react'
import styleable from 'react-styleable'
import css from './styles.css'
import {Button} from 'react-bootstrap'

function TableItemWritable ({name, value, index, measure, onClick}) {
 return (<tr><td>{name} </td> <td> <Button onClick={onClick.bind(null,{index,value})}  bsStyle="primary">Zmień</Button></td></tr>)   
} 
TableItemWritable.defaultProps = {
measure: ""    
}
TableItemWritable.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    index: React.PropTypes.string.isRequired,
    measure: React.PropTypes.string
}

export default styleable(css)(TableItemWritable)