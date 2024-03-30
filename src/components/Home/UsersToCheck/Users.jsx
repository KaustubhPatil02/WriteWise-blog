import React, { useState } from 'react'
import UseFetch from '../../hooks/UseFetch'
import {Blog} from "../../../contextAPI/Context"
import FollowUserBtn from './FollowUserBtn';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const {data, loading} = UseFetch("users");
  const {currUser} = Blog();
  // const {}
  const [count,setCount] = useState(5);
  const usersProfiles = data && data?.slice(0,count).filter((user) => user?.userid !== currUser?.uid)
  // console.log(usersProfiles)
  const navigateToUser = useNavigate()
  return (
    <>
    {data &&
    usersProfiles?.map((user, i) =>{
      const {username, bio, userImg, uid} = user;
      return(
        <div key={i} className='flex items-start gap-3 my-4'>
          <div className='flex-1 flex items-center cursor-pointer gap-2'>
            <img
              // onClick={() => navigateToUser(`/profile/${uid}`) }
              className='w-[3rem] h-[3rem] rounded-full object-cover gap-4'
             src={userImg} alt="user's image" />
             <h2>{username}</h2>
             {/* <p>{bio}</p> */}
          </div>
          {/* <FollowUserBtn /> */}
        </div>
      )
    })}
   
    </>
  )
}

export default Users
