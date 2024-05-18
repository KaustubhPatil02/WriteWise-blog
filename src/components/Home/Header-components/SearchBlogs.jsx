import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Modal from '../../../utility/Modal';
import Blog from '../../../contextAPI/Context'

const SearchBlogs = ({modal, setModal}) => {

  // const {searchInput, setSearchInput} = useState('')
  // const {postData} = Blog();

  // const searchResults = postData && postData?.filter((post)=> post?.title.toLowerCase().includes(searchInput.toLowerCase()) );

  // useEffect(() => {
  //   console.log(searchResults)
  // })

  return (
    <>
    <Modal modal={modal} setModal={setModal}>
      <div className={`absolute sm:relative right-6 left-6 top-[4rem] sm:left-0 sm:top-0 
        ${modal ? "visible opacity-100" : "invisible sm:visible opacity-100"}
        transition-all duration-100     
      `}>
        <div className='flex items-center gap-2 bg-gray-100 px-2 rounded-full relative'>
          <span className='text-2xl text-gray-500'>
            <IoIosSearch />
          </span>
          <input 
          // value={searchInput} onChange={e => setSearchInput(e.target.value)}
          className='bg-transparent outline-none py-[0.4rem] text-sm w-[20rem]'
          type="text" placeholder='Search WriteWise Blog for Posts' 
           />
        </div>
      </div>
    </Modal>
    </>
  )
}

export default SearchBlogs