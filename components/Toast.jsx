import React from 'react'
import toast from 'react-hot-toast'

const Toast = (message) => {
  
        {toast(message,{
            icon: "👏",
            style: {
                boarderRadius: '10px',
                background: '#333',
                color: '#fff',
                positio: "top-right"

            }
        })}
  
}

export default Toast