import React from 'react'
import useFetch from '../../hooks/UseFetch';
import Loading from "../../../components/loading/Loading"
import PostCard from './PostCard';

const Posts = () => {
  const { data, loading } = useFetch("writewise-posts");
  
  return (
    <div className=''>
      <section className='flex flex-col gap-[2.5rem]'>
        {loading ? (
          <Loading />
        ) : data.length > 0 ? (
          data.map((post, i) => <PostCard post={post} key={i} />)
        ) : (
          <div className='flex flex-col gap-2'><h1 className='text-3xl'>No posts found. Oops!</h1>
          <p>Why don't you create one instead !</p></div>
        )}
      </section>
    </div>
  );
}

export default Posts;