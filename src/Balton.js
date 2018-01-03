import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Header, Card, StatusItem, HoverButton, TableItemSubmit, TableItem, Table, TableItemState, TableItemStateVar, TableItemSignal, TableHeader, SchedulerItem} from './components'
import * as Lang from './localization/lang-pl' 
import {pushAnalog, pushInteger, pushDigital} from "./pco"
import * as Action from "./actions"
import {Panel, Form} from 'react-bootstrap'
import * as Const from './constants'

const ANALOG = "ANALOG"
const DIGITAL = "DIGITAL"
const INTEGER = "INTEGER"

class Balton extends Component {   
constructor(props) {
super(props)
this.handleScheduleChange = this.handleScheduleChange.bind(this)
this.updateValue = this.updateValue.bind(this)
this.getAlarmDescription = this.getAlarmDescription.bind(this)
this.state = {open:true}
}
componentWillUpdate(nextProps){   
console.log(`Updating container`)     
}

componentWillMount() {
}
componentDidMount() {           
}

getAlarmDescription(slave) {
let {data} = this.props, names = [Lang.AL_BOARD,Lang.AL_FIRE,Lang.AL_W_INLET_COOL,
    Lang.AL_W_OUTLET_COOL,Lang.AL_W_INLET_HEAT,Lang.AL_W_OUTLET_HEAT,Lang.AL_COMPRESSOR]  
if(!data.digitals.get) return ""
return Const.SLAVE_ALARM[slave].map((id,idx) =>  data.digitals.get(id) > 0 ? names[idx] : null)
.filter((id, idx, arr) => arr[idx] != null )[0] || ""
}
handleScheduleChange(d) {
let {data, dispatch} = this.props 
dispatch((dispatch) => {   
if(Object.keys(data[d.type]).length) {   
data[d.type].set(d.index,d.value)
dispatch({type:Action.OP_VALUE_CHANGE,data: data})
}})}

updateValue(type,index,value) {
let {dispatch} = this.props   
//console.log(`Setting ${value}`) 
dispatch((dispatch) => {
switch(type) {
case ANALOG:
pushAnalog(index,value,(res,err) => {   
 if(err) { console.log(err); dispatch({type:Action.VALUE_CHANGE_FAILED}); return}
 dispatch({type: Action.VALUE_CHANGE_SUCCESS})
 console.log(`Set value ${res.val} for ${res.type} on index ${res.index}`)  
}); break
case DIGITAL:
pushDigital(index,value,(res,err) => {
 if(err) { console.log(err); dispatch({type:Action.VALUE_CHANGE_FAILED}); return}
 dispatch({type: Action.VALUE_CHANGE_SUCCESS})
 console.log(`Set value ${res.val} for ${res.type} on index ${res.index}`)     
}); break
case INTEGER:
pushInteger(index,value,(res,err) => {
 if(err) { console.log(err); dispatch({type:Action.VALUE_CHANGE_FAILED}); return}
 dispatch({type: Action.VALUE_CHANGE_SUCCESS})  
 console.log(`Set value ${res.val} for ${res.type} on index ${res.index}`)   
}); break
}    
})}

render() {
let {data} = this.props
let {open} = this.state

return (  
<Card>
    <Header name={'Balton Strefa I'} alarm={data.digitals.values ? data.digitals.get(15) : '0'}  cool={data.digitals.values ? data.digitals.get(3) : '0'} heat={data.digitals.values ? data.digitals.get(5) : '0'}/>
    <Table>
        <TableItemStateVar name={Lang.ONOFF} 
         names={[Lang.OFF,Lang.ON]}
         options={["0.0","0.1"]}
         write={true}
         index="1"
         main={data.analogs.values ? data.analogs.get(3) : '0'}
         mod={(value) => value*10}
         onSubmit={this.updateValue}
         value={data.analogs.values ? data.analogs.get(1) : '0'}/>
         
        <TableItemSubmit name={Lang.ALARM_RESET} 
        index="17"
        button={Lang.RESET}
        type={DIGITAL}
        onSubmit={this.updateValue}
        value="1"/>
    <TableHeader header={Lang.READOUTS} />
    <TableItemState name={Lang.ALLOW_WORK} 
        write={false}
        names={[Lang.OFF,Lang.ON]} 
        options={["0","1"]} 
        value={data.digitals.values ? data.digitals.get(1) : Lang.NONE} />
    <TableItem name={Lang.ROOM} value={data.analogs.values ? data.analogs.get(5) : '0'} measure="C" />
    <TableItem name={Lang.PRESSURE} value={data.analogs.values ? data.analogs.get(13) : '0'} measure="Pa"/>
    <TableHeader header={Lang.SETPOINTS} />
         <TableItemState name={Lang.ROOM}
         write={true} 
         value={data.analogs.values ? data.analogs.get(7) : Lang.ZERO}
         index="7"
         limit="50"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItemState name={Lang.HUMIDITY}
         write={true} 
         value={data.analogs.values ? data.analogs.get(15) : Lang.ZERO}
         index="15"
         limit="100"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItem name={Lang.COOL_SETPOINT} value={data.analogs.values ? data.analogs.get(9) : '0'} measure="%"/>
         <TableItem name={Lang.HEAT_SETPOINT} value={data.analogs.values ? data.analogs.get(11) : '0'} measure="%"/>
         <TableItem name={Lang.HUMIDITY_SETPOINT} value={data.analogs.values ? data.analogs.get(17) : '0'} measure="%"/>
      
        <TableItemSignal name={Lang.HEAT_PUMP_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(7) : '0'}/>
        <TableItemSignal name={Lang.VRF_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(9) : '0'}/>
        <TableItemSignal name={Lang.HUMIDIFIER_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(11) : '0'}/>    
    </Table>
</Card>
)    
}
}

Balton.propTypes = {
lang: React.PropTypes.string.isRequired     
}
Balton.defaultProps = {
lang:"pl"    
}

function mapStateToProps(state){
return {data:state}    
}

function mapDispatchToProps(dispatch){
return {dispatch: dispatch}    
}
export default connect(mapStateToProps,mapDispatchToProps)(Balton)