
export const Credentials = 'Credentials'
export const login_type= 'login_type'
export const success_url= 'success_url'
export const login_required= 'login_required'
export const modalOpen= 'modalOpen'

import React from 'react'
export const Button =(props)=> (<button className={props.className} id={props.id} onClick={props.handleClick}>{props.name}</button>)
