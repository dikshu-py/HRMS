import React from 'react'
import Users from './Users'
import Room from './Room'






//this Section is Divided in Two parts All Users and Chat
const index = () => {





  return (
    <div className='flex bg-white h-screen gap-2 '>
        <div className='w-1/4 h-full  '>
            <Users/>
        </div>
        <div className='h-full w-3/4 '>
            <Room/>
        </div>
    </div>
  )
}

export default index