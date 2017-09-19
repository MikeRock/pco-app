import React from 'react'
import styleable from 'react-styleable'
import css from './styles.css'
import {Table as Tab} from 'react-bootstrap' 

function Table ({children}) {
 const child_arr = React.Children.toArray(children)
return  (
 <Tab className="table">
 <thead>
 <tr>
    <th colspan="2">Nazwa</th>
</tr>
 </thead>
 <tbody>
{children}   
</tbody> 
 </Tab>)
}

export default styleable(css)(Table)