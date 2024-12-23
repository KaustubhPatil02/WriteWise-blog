import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Loading from '../../loading/Loading';
import { readTime } from '../../../utility/supporter';
import moment from 'moment';
import { Blog } from '../../../contextAPI/Context';
import Actions from './PostActions/Actions';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Highlight.js styles for code blocks
import { db } from '../../../Firebase/firebase';

const SinglePostView = () => {
  const { currUser } = Blog();
  const { postId } = useParams();
  const [post, setPost] = useState({}); // To store the post data
  const [loading, setLoading] = useState(false); // To check if the data is loading
  const navigateToUser = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, "writewise-posts", postId);
        const getPost = await getDoc(postRef);

        if (getPost.exists()) {
          const postData = getPost.data();
          setPost({ ...postData, id: getPost.id });
          if (postData?.userId) {
            const userRef = doc(db, "users", postData?.userId);
            const getUser = await getDoc(userRef);

            if (getUser.exists()) {
              const userData = getUser.data();
              setPost({ ...postData, ...userData, id: postId });
            }
          }
        }
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    // Highlight code blocks on initial load
    setTimeout(() => {
      document.querySelectorAll('.post-content pre').forEach((block) => {
        hljs.highlightElement(block);
      });
    }, 0);
  }, [post]);

  const { title, desc, postImg, username, created, userImg, userId } = post;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-header2">
          <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-bold text-white capitalize">{title}</h2>
            <div className="flex items-center gap-3 py-[3rem]">
              <img
                onClick={() => navigateToUser(`/profile/${userId}`)}
                className="w-[4rem] h-[4rem] object-cover rounded-full cursor-pointer text-white"
                src={userImg}
                alt=""
              />
              <div>
                <div className="text-white capitalize">
                  <span>{username}</span>
                </div>
                <p className="text-sm text-gray-300 ">
                  {readTime({ __html: desc })} min read . <span className="ml-1">{moment(created).fromNow()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-300">
              <div className="flex items-center gap-6 text-white"></div>
              <div className="flex items-center gap-5 pt-2 text-white">
                {currUser?.uid === post?.userId && <Actions postId={postId} title={title} desc={desc} />}
              </div>
            </div>

            <div className="mt-[3rem]">
              {postImg && <img className="object-cover w-full h-full mb-6" src={postImg} alt="Post Image" />}
              <div
                className="mt-6 text-white post-content"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SinglePostView;
