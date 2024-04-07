import React from 'react'
import useSingleFetch from '../../../hooks/UseSingleFetch';
import { Blog } from '../../../../contextAPI/Context';

const UserProfileList = ({getUserData}) => {
  const { currUser } = Blog();
  const { data, loading } = useSingleFetch("users", 
  currUser?.uid, 
  // postId?.id,
  "savedPost");
  return (
    <div className='bg-header2 min-h-screen'>
    {currUser?.uid === getUserData?.userId ? "posts" : <PrivatePosts />}
    </div>
  )
}

export default UserProfileList

const PrivatePosts = () => {
  return (
    <div>
      <h1>To be implemented Later</h1>
    </div>
  )
}