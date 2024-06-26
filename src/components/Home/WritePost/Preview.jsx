import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import ReactQuill from 'react-quill';
import TagsInput from 'react-tagsinput';
import { toast } from "react-toastify";
import { db, storage } from '../../../Firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Blog } from '../../../contextAPI/Context';
import { useNavigate } from 'react-router-dom';

const Preview = ({ setPublish, ideas, title }) => {
  const { currUser } = Blog();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const [content, setContent] = useState('');
  const imgRef = useRef(null);
  const [imgPrev, setImgPrev] = useState("");
  const clickHandler = () => {
    imgRef.current.click();
  }
  const [tagsInput, setTagsInput] = useState([])
  const [desc, setDesc] = useState('')
  const [preview, setPreview] = useState({
    title: '',
    bannerImg: '',
  })

  useEffect(() => {
    if (preview.title !== title && title || ideas) {
      setPreview(prev => ({
        ...prev,
        title: title
      }));
    }
    if (desc !== ideas && title || ideas) {
      setDesc(ideas);
    }
  }, [title, ideas, preview.title, desc])


  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (preview.title === '' || desc === '') {
        toast.error('Please fill all the fields');
        return;
      }
      if (tagsInput.length === 0) {
        toast.info('Please add Tags related to your post');
        return;
      }
      if (!preview.bannerImg) {
        toast.info('A banner image would have been great!');
    
      }
      const collections = collection(db, "writewise-posts");

      let imageUrl;
      if (typeof preview.bannerImg === 'string') {
        // If bannerImg is a URL, use it directly
        imageUrl = preview.bannerImg;
      } else {
        // If bannerImg is a File object, upload it to Firebase storage
        const storageRef = ref(storage, `images/${preview.bannerImg.name}`);
        await uploadBytes(storageRef, preview.bannerImg);
        imageUrl = await getDownloadURL(storageRef);
      }

      // pushing data into the database.
      await addDoc(collections, {
        userId: currUser.uid,
        title: preview.title,
        desc,
        tagsInput,
        postImg: imageUrl,
        created: Date.now(),
        PageViews: 0
      })
      toast.success('Post published successfully');
      navigate('/');
      setPublish(false);
      setPreview({ title: '', bannerImg: '' })
    } catch (error) {
      toast.error('Something went wrong');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    // <div className='bg-header1'>
    <section className='absolute inset-0 bg-header2 z-30'>
      <div className='size my-[2rem]'>
        <span
          onClick={() => setPublish(false)}
          className='absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer'>
          <IoIosCloseCircle className='text-4xl text-white' />
        </span>
        <div className='mt-[8rem] flex flex-col md:flex-row gap-10'>
          <div className='flex-1'>
            <h3 className='text-white text-xl'>Post Preview</h3>
            <div
              style={{ backgroundImage: `url(${imgPrev})` }}
              onClick={clickHandler}
              className='w-full h-[200px] object-cover bg-gray-100 my-3 grid place-items-center cursor-pointer bg-header1 bg-no-repeat'>
              {!imgPrev && <p className='text-2xl text-gray-500'>Add a banner for the blog</p>}
            </div>
            <input
              onChange={(e) => {
                if (e.target.files[0]) {
                  // If a file is selected, create an object URL
                  setImgPrev(URL.createObjectURL(e.target.files[0]))
                  setPreview({ ...preview, bannerImg: e.target.files[0] })
                } else {
                  // If a URL is entered, use it directly
                  setImgPrev(e.target.value)
                  setPreview({ ...preview, bannerImg: e.target.value })
                }
              }}
              ref={imgRef}
              type="file"
              hidden
            />
            <input
              className='outline-none w-full border-b border-gray-400 py-4 bg-header2 text-white text-xl'
              type="text"
              placeholder="or add an image URL"
              onChange={(e) => {
                setImgPrev(e.target.value);
                setPreview({ ...preview, bannerImg: e.target.value });
              }}
            />
            <input
              className='outline-none w-full border-b border-gray-400 py-4 bg-header2 text-white text-xl'
              type="text"
              placeholder="Title"
              value={preview.title}
              onChange={(e) => setPreview({ ...preview, title: e.target.value })}
            />
            <ReactQuill
              className='border-b border-gray-400 py-5 bg-header2 text-white'
              theme="bubble"
              value={desc}
              onChange={setDesc}
              // onChange={(e) => setPreview({ ...preview, contents: e.target.value })}
              placeholder='Content here!'
            />
          </div>
          <div className='flex-1 flex-col gap-[4] mb-5 md:mb-0'>
            <h3 className='text-2xl text-white '>Publishing to: <span className='font-bold capitalize'>WriteWise-Blogs</span></h3>
            <div className='mt-5 gap-6'>
              <p className='text-gray-500'>Add tags according to your post, so it reaches the targeted readers</p>
              <TagsInput
                value={tagsInput}
                onChange={setTagsInput}
                className='bg-write text-2xl'
                inputProps={{
                  style: {
                    color: 'white'
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                className='!bg-banner text-header1 font-semibold rounded-full px-3 py-2 mt-20'>
                {loading ? 'Publishing...' : 'Publish Now :)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    // </div>
  )
}

export default Preview;