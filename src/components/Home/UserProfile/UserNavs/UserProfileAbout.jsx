import React from 'react'

const UserProfileAbout = ({getUsersData, setEditModal}) => {
  return (
    <div className='w-full'>
      <p className='text-2xl first-letter:uppercase'>
        {getUsersData?.bio || getUsersData?.username + " has not updated their bio yet"}
      </p>
      <div className='text-right'>
        <button 
        onClick={() => setEditModal(true)}
        className='border border-white py-2 px-5 rounded-full bg-header2
        text-balck mt-[5rem]'>Edit here</button>
      </div>
    </div>
  )
}

export default UserProfileAbout