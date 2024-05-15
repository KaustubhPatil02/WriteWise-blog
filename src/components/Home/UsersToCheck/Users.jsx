import React, { useState } from 'react'
import UseFetch from '../../hooks/UseFetch'
import { Blog } from "../../../contextAPI/Context"
import FollowUserBtn from './FollowUserBtn';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { data, loading } = UseFetch("users");
  const { currUser } = Blog();
  // const {}
  const [count, setCount] = useState(5);
  const usersProfiles = data && data?.slice(0, 11).filter((user) => user?.id !== currUser?.uid)
  // const usersProfiles = data && data?.slice(0, 7).filter((user) => user?.userid !== currUser?.uid)
  // console.log(usersProfiles)
  const navigateToUser = useNavigate()
  return (
    <>
      {data &&
        usersProfiles?.map((user, i) => {
          const { username, bio, userImg, id } = user;
          // console.log(user)
          return (
            <div key={i} className='flex items-start gap-3 my-4'>
            <div className='flex-1 flex items-center cursor-pointer gap-2'>
              <img
                onClick={() => navigateToUser(`/profile/${id}`)}
                className='w-[3rem] h-[3rem] rounded-full object-cover gap-4'
                src={userImg} alt="user's image" />
              <div>
                <h2 className='text-blue-500 text-lg mb-1'>{username}</h2> {/* Increased margin-bottom */}
                <p className='text-gray-500 text-sm mt-1'>{bio ? bio : 'No bio'}</p> {/* Increased margin-top */}
              </div>
            </div>
            {/* <FollowUserBtn /> */}
          </div>
          )
        })}

    </>
  )
}

export default Users
