import React from 'react'
import styleable from 'react-styleable'
import css from './styles.css'
import {Button} from 'react-bootstrap'

function TableItem ({name, value, measure}) {
 return (<tr><td>{name}</td> <td><Button disabled="true" bsStyle="default">{value} {measure}</Button></td></tr>)   
} 
TableItem.defaultProps = {
measure: ""    
}
TableItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    measure: React.PropTypes.string
}

export default styleable(css)(TableItem)