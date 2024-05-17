import React from 'react';
import UseFetch from '../../hooks/UseFetch';
import { readTime } from '../../../utility/supporter';
import moment from 'moment';
import SavedPosts from './PostActions/SavedPosts';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { title, desc, created, postImg, id: postId, userId } = post;
  const { data, loading } = UseFetch("users");
  const getUsersData = data && data.find((user) => user?.id === userId);
  const navigateToPost = useNavigate();

  return (
    <section>
      <div
        onClick={() => navigateToPost(`/post/${postId}`)}
        className='flex flex-col sm:flex-row gap-6rem cursor-pointer'
      >
        <div className='flex-[3rem]'>
          <p className='pb-2 font-semibold capitalize text-banner'>{getUsersData?.username}</p>
          <h2 className="text-xl font-bold line-clamp-4 leading-10 capitalize text-white">
            {title}
          </h2>
          <div className='py-1 text-gray-400 line-clamp-5 leading-5'
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
        {/* <div className='flex-[1] outline-none cursor-pointer'>
          {postImg && 
                    <img
                    src={postImg} alt=""
                    className='w-[40rem] h-[20rem] object-cover rounded-lg shadow-lg '
                  />
          }

        </div> */}

<div className='flex-[1] outline-none cursor-pointer'>
  {postImg && 
    <img
      src={postImg} 
      alt=""
      className='md:w-[40rem] md:h-[20rem] w-full h-auto object-cover rounded-lg shadow-lg'
    />
  }
</div>
      </div>
      <div className='flex items-center justify-between w-full md:w-[80%] mt-[3rem] md:mt-0'>
        <p className='text-sm text-gray-300'>
          {readTime({ __html: desc })} min reading time. Created At {moment(created).format("DD-MM-YYYY")}
        </p>
        <div className=' flex items-center gap-4'>
          {/* <SavedPosts post={post} getUsersData={getUsersData}/> */}
        </div>
      </div>
    </section>
  );
}

export default PostCard;
