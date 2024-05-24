import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../utility/Modal'
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import LoadingBar from '../../loading/LoadingBar';
import Loading from '../../loading/Loading';

const EditProfileModal = ({ editModal, setEditModal, getUsersData }) => {
  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    userImg: "",
    bio: "",
    socialhandles1: "",
    socialhandles2: "",
    socialhandles3: "",
  });

  const fileOpen = () => {
    imgRef.current.click();
  }

  useEffect(() => {
    if (getUsersData) {
      setFormData(getUsersData)
    } else {
      setFormData({
        username: "",
        userImg: "",
        bio: "",
        socialhandles1: "",
        socialhandles2: "",
        socialhandles3: "",
      })
    }
  }, [getUsersData])

  const deleteImage = async () => {
    if (!formData.userImg) {
      toast.error("No image to delete");
      return;
    }

    setLoading(true);

    const storageRef = ref(storage, `images/${formData.userImg.name}`);

    try {
      await deleteObject(storageRef);
      setImgUrl('');
      setFormData({ ...formData, userImg: '' });
      toast.success('Image deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }

  const saveFormData = async () => {
    if (formData.username === "" || formData.bio === "") {
      toast.error("Please fill all the fields");
      return;
    } 
    setLoading(true);

      // Ensure all fields in formData are defined
  const finalFormData = {
    ...formData,
    socialhandles1: formData.socialhandles1 || "",
    socialhandles2: formData.socialhandles2 || "",
    socialhandles3: formData.socialhandles3 || "",
  };

    const storageRef = ref(storage, `images/${formData.userImg.name}`);

    await uploadBytes(storageRef, formData?.userImg);

    const imageUrl =  await getDownloadURL(storageRef);
    try {
      const docRef = doc(db, "users", getUsersData.userId );
      await updateDoc(docRef, {
        bio: formData.bio,
        username: formData.username,
        userImg: imgUrl ? imageUrl :formData.userImg ,
        userId: formData?.userId,
        socialhandles1: formData.socialhandles1,
        socialhandles2: formData.socialhandles2,
        socialhandles3: formData.socialhandles3,
      });
    setLoading(false);
    setEditModal(false);
    toast.success('Update Successfull!!')

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
    {loading && <Loading />}
      <Modal modal={editModal} setModal={setEditModal}>
      <div className='center w-[95] md:w-[50rem] bg-header2 mx-auto shadows-sm my-[1rem] z-10 mb-[3rem] p-[2rem] shadow scrollable-modal'>
        <div className='flex flex-center justify-between'>
          <h2 className='font-semibold text-3xl'>Your Profile Information</h2>
          <button
            onClick={() => setEditModal(false)}
            className='text-xl'>
            <IoIosCloseCircle />
          </button>
        </div>
        <section className='mt-6 bg'>
          <p className='pb-3 text-sm text-gray-400'>Avatar</p>
          <div className='flex gap-[2rem]'>
            <div className='w-[5rem]'>
              <img
                src={imgUrl ? imgUrl :formData.userImg ? formData.userImg : '/loading.gif'}
                className='min-h-[5rem] min-w-[5rem] object-cover rounded-full border border-gray-300 border-radius'
                alt=""
              />
              <input
                ref={imgRef}
                type="file"
                className='hidden'
                accept='image/*'
                onChange={(e) => {
                  setImgUrl(URL.createObjectURL(e.target.files[0]))
                  setFormData({ ...formData, userImg: e.target.files[0] })
                }}
              />
            </div>
            <div className='flex gap-4 text-sm'>
              <button onClick={fileOpen} className='text-green-700 '>Update</button>
              <button onClick={deleteImage} className='text-red-700'>Remove</button>
            </div>
          </div>
        </section>
        <section className='pt-[1rem] text-sm '>
          <label htmlFor="" className='pb-3 block'>Name*</label>
          <input
            className='outline-none p-1 w-full border-b border-white bg-header2'
            type="text"
            placeholder='UserName to be displayed'
            value={formData.username}
            maxLength={50}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <p 
          className='text-sm pt-2 text-gray-500'>
            Appears on your Profile page, as your byline, and in your responses.{formData.username.length}/50</p>
          <section className='pt-[1rem] text-sm'>
            <label htmlFor="" className='pb-3 block'>Bio*</label>
            <input
              className='outline-none p-1 w-full border-b border-white bg-header2'
              type="text"
              placeholder='Your bio'
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              maxLength={200}
            />
            <p className='text-sm pt-2 text-gray-500'>
              Appears on your Profile and next to your blogs.{formData.bio.length}/200</p>
          </section>
          <section className='pt-[1rem] text-sm'>
            <label htmlFor="" className='pb-3 block'>Social Handle 1 </label>
            <input
              className='outline-none p-1 w-full border-b border-white bg-header2'
              type="text"
              placeholder='SocialHandles1 profile link'
              value={formData.socialhandles1}
              onChange={(e) => setFormData({ ...formData, socialhandles1: e.target.value })}
            />
          </section>
          <section className='pt-[1rem] text-sm'>
            <label htmlFor="" className='pb-3 block'>SocialHandles 2</label>
            <input
              className='outline-none p-1 w-full border-b border-white bg-header2'
              type="text"
              placeholder='SocialHandles 2 profile link'
              value={formData.socialhandles2}
              onChange={(e) => setFormData({ ...formData, socialhandles2: e.target.value })}
            />
          </section>
          <section className='pt-[1rem] text-sm'>
            <label htmlFor="" className='pb-3 block'>SocialHandles-3</label>
            <input
              className='outline-none p-1 w-full border-b border-white bg-header2'
              type="text"
              placeholder='SocialHandles-3 profile link'
              value={formData.socialhandles3}
              onChange={(e) => setFormData({ ...formData, socialhandles3: e.target.value })}
            />
          </section>
        </section>
        <div className='flex items-center justify-end gap-4 pt-[2rem]'>
          <button onClick={saveFormData} className='bg-green-700 py-2 px-5 text-white rounded-full'>Save</button>
          <button onClick={() => setEditModal(false)} className=' bg-red-700 py-2 px-5 text-white rounded-full '>Cancel</button>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default EditProfileModal