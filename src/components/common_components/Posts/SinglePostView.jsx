import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import Loading from '../../loading/Loading'
// import readTime from '../../../utility/supporter'
import { readTime } from '../../../utility/supporter';
import { useNavigate } from 'react-router-dom';

import { db } from '../../../Firebase/firebase'
import moment from 'moment';
import SavedPosts from './PostActions/SavedPosts';
import SharePost from './PostActions/SharePost';
import Comments from './PostActions/Comments';
import Like from './PostActions/Like';
import { Blog } from '../../../contextAPI/Context';

const SinglePostView = () => {
    const { currUser } = Blog()
    const { postId } = useParams()
    const [post, setPost] = useState({})  // to store the post data
    const [loading, setLoading] = useState(false)  // to check if the data is loading

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                const postRef = doc(db, "writewise-posts", postId);
                const getPost = await getDoc(postRef);

                // to check if the post exists
                if (getPost.exists()) {
                    const postData = getPost.data()
                    setPost({ ...postData, id: getPost.id })
                    // console.log(getPost.data())
                    if (postData?.userId) {
                        const userRef = doc(db, "users", postData?.userId);
                        const getUser = await getDoc(userRef);

                        if (getUser.exists()) {
                            const userData = getUser.data();
                            setPost({ ...postData, ...userData, id: postId })
                        }
                    }
                }
                setLoading(false)
            } catch (error) {
                toast.error(error.message)
                setLoading(false)

            }
        };
        fetchPost()
    }, [postId])
    // console.log(post)

    const { title, desc, postImg, username, created, userImg, userId } = post

    const navigateToUser = useNavigate()

    return (
        <>
            {loading ? (
                <Loading />
            )
                : (
                    <>
                        <div className='bg-header2 min-h-screen'>
                            <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem] '>
                                <h2 className='text-4xl font-bold capitalize text-white'>{title}</h2>
                                <div className='flex items-center gap-3 py-[3rem]'>
                                    <img
                                        onClick={() => {
                                            if (currUser) {
                                                navigateToUser(`/profile/${userId}`);
                                            } else {
                                                toast.info('You are being redirected because you are not authenticated.');
                                                navigateToUser(`/First`);
                                            }
                                        }}
                                        className='w-[4rem] h-[4rem] object-cover rounded-full cursor-pointer text-white'
                                        src={userImg}
                                        alt=""
                                    />
                                    <div>
                                        <div className='capitalize  text-white'>
                                            <span>{username}</span>
                                        </div>
                                        <p className='text-sm text-gray-300 '>
                                            {readTime({ __html: desc })} min read .
                                            <span className='ml-1'>{moment(created).fromNow()}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between border-b border-gray-300'>
                                    {/* left */}
                                    <div className='flex items-center gap-6  text-white'>
                                        {/* <Like />
                                        <Comments /> */}
                                    </div>
                                    {/* right */}
                                    <div className='flex items-center pt-2 gap-5  text-white'>
                                        {/* {post && <SavedPosts post={post} />} */}
                                        {/* <SharePost /> */}
                                        {/* <ActionBtn /> */}
                                    </div>
                                </div>

                                {/* postdesc */}
                                <div className='mt-[3rem]'>
                                    <img className='w-full h-full object-cover ' src={postImg} alt="Post Image" />
                                    <div className='mt-6  text-white' dangerouslySetInnerHTML={{ __html: desc }} />
                                </div>
                            </section>
                        </div>
                    </>
                )

            }
        </>
    )
};

export default SinglePostView