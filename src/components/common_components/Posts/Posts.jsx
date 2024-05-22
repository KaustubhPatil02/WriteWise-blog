import React from 'react'
import useFetch from '../../hooks/UseFetch';
import Loading from "../../../components/loading/Loading"
import PostCard from './PostCard';
// import { useFetchers } from 'react-router-dom';

const Posts = () => {
  const { data, loading } = useFetch("writewise-posts");

  // Sort posts by created time in descending order
  const sortedData = [...data].sort((a, b) => new Date(b.created) - new Date(a.created));
  
  return (
    <div className=''>
      <section className='flex flex-col gap-[2.5rem]'>
        {loading ? (
          <Loading />
        ) : sortedData.length > 0 ? (
          sortedData.map((post, i) => <PostCard post={post} key={i} />)
        ) : (
          <div className='flex flex-col gap-2'><h1 className='text-3xl text-gray-400'>No posts found. Oops!</h1>
          <p className='text-gray-400'>Why don&apos;t you create one instead!</p></div>
        )}
      </section>
    </div>
  );
}

export default Posts;