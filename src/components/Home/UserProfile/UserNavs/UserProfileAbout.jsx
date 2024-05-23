import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLink, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareXTwitter, FaHashnode } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Blog } from '../../../../contextAPI/Context'

const UserProfileAbout = ({ getUsersData, setEditModal }) => {
  const { currUser } = Blog();
  const getSocialIcon = (url) => {
    if (url.includes('facebook')) return <a href={url} target="_blank" rel="noopener noreferrer"><FaFacebook size="2em" /></a>;
    if (url.includes('hashnode')) return <a href={url} target="_blank" rel="noopener noreferrer"><FaHashnode size="2em" /></a>;
    if (url.includes('twitter')) return <a href={url} target="_blank" rel="noopener noreferrer"><FaTwitter size="2em" /></a>;
    if (url.includes('instagram')) return <a href={url} target="_blank" rel="noopener noreferrer"><FaInstagram size="2em" /></a>;
    if (url.includes('github')) return <a href={url} target="_blank" rel="noopener noreferrer"><FaGithub size="2em" /></a>;
    if (url.includes('x')) return <a href={url} target="_blank" rel="noopener noreferrer"><FaXTwitter size="2em" /></a>;
    if (url.includes('linkedin')) return <a href={url} target="_blank" rel="noopener noreferrer"><FaLinkedinIn size="2em" /></a>;
    return <a href={url} target="_blank" rel="noopener noreferrer"><FaLink size="2em" /></a>; // default icon
  };

  return (
    <div className='min-h-screen'>
      <p className='text-4xl first-letter:uppercase'>
        {getUsersData?.bio || (typeof getUsersData?.username === 'string' ? getUsersData.username : 'User') + " has not updated their bio yet"}
      </p>
      <div className='text-right'>
        {currUser?.uid === getUsersData?.userId &&
          <button
            onClick={() => setEditModal(true)}
            className='border border-white py-2 px-5 rounded-full bg-header2
        text-balck mt-[5rem]'>Edit here</button>
      }
      </div>
      <div>
        <h1 className='text-4xl mt-10'>Here are my Social Handles:</h1>
        {(!getUsersData?.socialhandles1 && !getUsersData?.socialhandles2 && !getUsersData?.socialhandles3) ?
          // eslint-disable-next-line react/no-unescaped-entities
          <p className='mt-5'>User hasn't added any social handles yet.</p> :
          <div className='mt-5 flex gap-5'>
            {getUsersData?.socialhandles1 ? getSocialIcon(getUsersData?.socialhandles1) : null}
            {getUsersData?.socialhandles2 ? getSocialIcon(getUsersData?.socialhandles2) : null}
            {getUsersData?.socialhandles3 ? getSocialIcon(getUsersData?.socialhandles3) : null}
          </div>
        }
      </div>
    </div>
  )
}

export default UserProfileAbout