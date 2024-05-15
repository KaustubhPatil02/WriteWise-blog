import React from 'react'
import { Blog } from '../../../../contextAPI/Context'

const UserProfileAbout = ({getUsersData, setEditModal}) => {
  const {currUser} = Blog();
  return (
    <div className='min-h-screen'>
      <p className='text-2xl first-letter:uppercase'>
        {getUsersData?.bio || getUsersData?.username + " has not updated their bio yet"}
      </p>
      <div className='text-right'>
        {currUser?.uid === getUsersData?.userId && 
        <button 
        onClick={() => setEditModal(true)}
        className='border border-white py-2 px-5 rounded-full bg-header2
        text-balck mt-[5rem]'>Edit here</button>
      }
      </div>
    </div>
  )
}

export default UserProfileAbout