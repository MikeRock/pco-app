import styleable from 'react-styleable'
import React, {PropTypes} from 'react'
import css from './styles.css'
import {Badge} from 'react-bootstrap'

const COOL = <i className="fa fa-snowflake-o"></i>
const HEAT = <i className="fa fa-sun-o"></i>
const COOL_GREY = <i className="grey fa fa-snowflake-o"></i>
const HEAT_GREY = <i className="grey fa fa-sun-o"></i>
const LED_ON = <i className=" fa fa-asterisk"></i>
const LED_OFF = <i className="grey fa fa-asterisk"></i>
const LED_ERR = <i className="err fa fa-asterisk"></i>
const BELL_OFF = <i className="fa fa-bell"></i>
const BELL = <i className="err fa fa-bell"></i>
const ALARM = "ALARM"
const LED = "LED"

function TableItemSignal ({name, type, value}) {
 return <tr><td>{name}</td> <td>{type == LED ? (Number(value) > 0 ? LED_ON : LED_OFF) : (Number(value) > 0 ? <span>{BELL}</span> : BELL_OFF )}</td></tr>   
}

TableItemSignal.ALARM =  ALARM
TableItemSignal.LED = LED

TableItemSignal.propTypes = {
name: PropTypes.string.isRequired,
value: PropTypes.any.isRequired,
type: PropTypes.string.isRequired    
}

TableItemSignal.defaultProps = {
type: TableItemSignal.LED    
}

export default styleable(css)(TableItemSignal)