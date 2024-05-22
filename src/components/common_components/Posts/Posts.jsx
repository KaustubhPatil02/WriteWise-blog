import React, { useState } from 'react'
import useFetch from '../../hooks/UseFetch';
import Loading from "../../../components/loading/Loading"
import PostCard from './PostCard';

const Posts = () => {
  const { data, loading } = useFetch("writewise-posts");
  const [postCount, setPostCount] = useState(5); // State to keep track of post count

  // Sort posts by created time in descending order
  const sortedData = [...data].sort((a, b) => new Date(b.created) - new Date(a.created));

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    setPostCount(prevCount => prevCount + 2); // Increase post count by 2
  }
  
  return (
    <div className=''>
      <section className='flex flex-col gap-[2.5rem]'>
        {loading ? (
          <Loading />
        ) : sortedData.length > 0 ? (
          sortedData.slice(0, postCount).map((post, i) => <PostCard post={post} key={i} />)
        ) : (
          <div className='flex flex-col gap-2'><h1 className='text-3xl text-gray-400'>No posts found. Oops!</h1>
          <p className='text-gray-400'>Why don&apos;t you create one instead!</p></div>
        )}
        {sortedData.length > postCount && (
          <button 
          className='btn bg-write text-white rounded-full px-2 py-1 item-center'
          onClick={handleLoadMore}>Load More</button>
        )}
      </section>
    </div>
  );
}

export default Posts;