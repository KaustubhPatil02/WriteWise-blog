import UseFetch from '../../hooks/UseFetch';
import { readTime } from '../../../utility/supporter';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Loading from '../../loading/Loading'
import { Blog } from '../../../contextAPI/Context';
import Actions from './PostActions/Actions';

// eslint-disable-next-line react/prop-types
const PostCard = ({ post }) => {
  // eslint-disable-next-line react/prop-types
  const { title, desc, created, postImg, id: postId, userId } = post;
  const { currUser } = Blog();
  const { data, loading } = UseFetch("users");
  const getUsersData = data && data.find((user) => user?.id === userId);
  const navigateToPost = useNavigate();

  return (
    <section>
      <div
        onClick={() => navigateToPost(`/post/${postId}`)}
        className='flex flex-col sm:flex-row gap-6rem cursor-pointer'
      >
        {loading && <Loading />}
        <div className='flex-[3rem]'>
          <p className='pb-2 font-semibold capitalize text-banner'>{getUsersData?.username}</p>
          <h2 className="text-xl font-bold line-clamp-4 leading-10 capitalize text-white">
            {title}
          </h2>
          <div className='py-1 text-gray-400 line-clamp-5 leading-5'
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
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
          {readTime({ __html: desc })} min reading time. Created At {moment(created).format("MMM-DD YYYY")}
        </p>
        <div className=' flex items-center gap-4'>
          {currUser?.uid === userId && <Actions post={post} postId={postId} title={title} desc={desc}/>}
        </div>
      </div>
      <hr /> {/* Horizontal line */}
    </section>
  );
}

export default PostCard;