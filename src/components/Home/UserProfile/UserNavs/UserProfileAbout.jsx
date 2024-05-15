import React from 'react'
import { Blog } from '../../../../contextAPI/Context'

const UserProfileAbout = ({getUsersData, setEditModal}) => {
  const {currUser} = Blog();
  return (
    <div className='min-h-screen'>
      <p className='text-4xl first-letter:uppercase'>
      {getUsersData?.bio || (typeof getUsersData?.username === 'string' ? getUsersData.username : 'User') + " has not updated their bio yet"}
        {/* {getUsersData?.bio || getUsersData?.username + " has not updated their bio yet"} */}
      </p>
      <div className='text-right'>
        {currUser?.uid === getUsersData?.userId && 
        <button 
        onClick={() => setEditModal(true)}
        className='border border-white py-2 px-5 rounded-full bg-header2
        text-balck mt-[5rem]'>Edit here</button>
        }
      </div>
      <div>
        <h1 className='text-4xl mt-10'>Here are my Social Handles:</h1>
        {(!getUsersData?.socialhandles1 && !getUsersData?.socialhandles2 && !getUsersData?.socialhandles3) ? 
          <p className='mt-5'>User hasn't added any social handles yet.</p> :
          <>
          <div className='mt-5'>
            
          <p>{getUsersData?.socialhandles1 ? <>Social Handle 1 - <a href={getUsersData?.socialhandles1} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>{getUsersData?.socialhandles1}</a></> : null}</p>
<p>{getUsersData?.socialhandles2 ? <>Social Handle 2 - <a href={getUsersData?.socialhandles2} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>{getUsersData?.socialhandles2}</a></> : null}</p>
<p>{getUsersData?.socialhandles3 ? <>Social Handle 3 - <a href={getUsersData?.socialhandles3} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>{getUsersData?.socialhandles3}</a></> : null}</p>
          </div>
          </>
        }
      </div>
    </div>
  )
}

export default UserProfileAbout