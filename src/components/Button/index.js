import React from 'react'
import style from './style.module.css'

const index = ({ children, ...props }) => {
    return (
        <button className={style.button} {...props}>
            {children}
        </button>
    )
}

export default index
