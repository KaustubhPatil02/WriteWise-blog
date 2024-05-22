import useFetch from '../../../hooks/UseFetch'
import Loading from '../../../loading/Loading'
import PostCard from '../../../common_components/Posts/PostCard'

// eslint-disable-next-line react/prop-types
const UserProfileHome = ({ getUsersData }) => {
  const { data, loading } = useFetch("writewise-posts")
  // eslint-disable-next-line react/prop-types
  const userPost = data && data?.filter((post) => post?.userId === getUsersData?.userId)

  // console.log(userPost)
  return (
    <>
      <div className='min-h-screen flex flex-col gap-5 mb-[4rem] '>
        {userPost.length === 0 && <h1 className='text-center text-2xl'>No Posts Yet</h1>}
        {loading ? <Loading /> : userPost?.map((post, i) => <PostCard post={post} key={i} />)}

      </div>
    </>
  )
}

export default UserProfileHome