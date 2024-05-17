/* eslint-disable react/prop-types */
// import React from 'react'
import useSingleFetch from '../../../hooks/UseSingleFetch';
import { Blog } from '../../../../contextAPI/Context';
import PostCard from '../../../common_components/Posts/PostCard'
import Loading from '../../../loading/Loading'
import { BiLock } from 'react-icons/bi'; // Assuming BiLock is from react-icons library

// eslint-disable-next-line react/prop-types
const UserProfileList = ({getUsersData}) => {
  const { currUser } = Blog();
  const { data, loading } = useSingleFetch("users", 
  currUser?.uid, 
  // postId?.id,
  "savedPost");

//   console.log('currUser', currUser);
// console.log('getUsersData', getUsersData);
// console.log('data', data);
// console.log('loading', loading);

  return (
    <div className='bg-header2 min-h-screen'>
    {currUser && currUser?.uid === getUsersData?.userId ? (
      <div className="flex flex-col gap-[2rem] mb-[2rem]">
        {data && data.length === 0 && (
          <p className="text-gray-500">
            <span className="capitalize mr-1">{getUsersData?.username}</span>{" "}
            has no saved post
          </p>
        )}
        {loading ? (
          <Loading />
        ) : (
          data && data?.map((post, i) => <PostCard post={post} key={i} />)
        )}
      </div>
    ) : (
      <PrivatePosts username={getUsersData?.username} />
    )}
  </div>
  )
}

export default UserProfileList

const PrivatePosts = ({ username }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[3rem] text-center">
      <p>
        <span className="capitalize">{username}'s saved posts are private</span>
      </p>
      <span className="text-[10rem] text-gray-500">
        <BiLock />
      </span>
    </div>
  )
}