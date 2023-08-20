// 'use client'

import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import {Toaster} from 'react-hot-toast'


export const metadata ={
    title: 'Promptopia',
    desc: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  
  return (
    <html lang='en'>
       <body className="min-h-full">
        <Provider>
        <div className="main" >
            <div className="gradient w-full" />
        </div>
            <main className="app h-full" >
                <Nav  />
                {children }
                <Toaster />
            </main>
        
        </Provider>
       </body>
    </html>
  )
}

export default RootLayout