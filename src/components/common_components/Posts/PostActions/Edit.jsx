import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { Blog } from '../../../../contextAPI/Context'

const Edit = () => {
  const {updateData, title, setTitle, desc, setDesc} = Blog();
   

    useEffect(()=>{
      if (updateData) {
        setTitle(updateData.title)
        setDesc(updateData.desc)
      }
    },[updateData])

  return (
    <div className='bg-header2 min-h-screen'>
    <section className='write w-[90% md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
        <input 
            type="text" 
            placeholder='Title...' 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='bg-header2 text-4xl outline-none w-full text-white' />
        <ReactQuill 
            placeholder='Edit here...'
            className='!text-[4rem] my-3 text-white text-2xl' 
            theme='bubble'
            value={desc}
            onChange={setDesc}

            />
    </section>
    </div>
  )
}

export default Edit