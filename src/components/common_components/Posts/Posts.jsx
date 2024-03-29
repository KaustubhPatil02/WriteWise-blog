import React from 'react'
import useFetch from '../../hooks/UseFetch';
import Loading from "../../../components/loading/Loading"
import PostCard from './PostCard';

const Posts = () => {
  const { data, loading } = useFetch("writewise-posts");
  // console.log(data);
  
  return (
    <div className=''>
      <section className='flex flex-col gap-[2.5rem]'>
      {loading ?(<Loading />) : (data.map((post, i) => <PostCard post={post} key={i}  />))}
      {/* {loading ? (
        <Loading />
      ) : data ? (
        data.map((post, i) => <PostCard post={post} key={i} />)
      ) : (
        <p>No posts found.</p>
      )} */}
    </section>
    </div>
  );
}

export default Posts;
