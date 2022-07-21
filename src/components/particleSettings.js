import React from 'react'
import Particles from 'react-tsparticles'

export default function particleSettings() {
  return (
    <div>
     <Particles height='1000px' width='100vw' 
     id='tsparticles'
     options={{
        background: 
        {
            color:{
                value:"#0d47a1"
            }
        }
     }}
     />
    </div>
  )
}
