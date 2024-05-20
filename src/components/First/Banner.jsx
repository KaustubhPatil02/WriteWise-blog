// eslint-disable-next-line no-unused-vars
import React from 'react'

const Banner = () => {
  return (
    <div className="bg-post1 border-b border-black text-white">
      <div className="size py-[8rem] flex flex-col items-start gap-[1rem]">
        <h1 className="font-title text-[3rem] sm:text-[4rem] md:text-[6rem] font-normal">
          Stay curious.
        </h1>
        <p className="w-full md:w-[60rem] text-[1.3rem] md:text-[1.5rem] font-medium leading-7">
        "Explore narratives, insights, and knowledge shared by developers on any subject. Unlock a platform akin to Medium, tailored for developers to exchange blogs, stories, and expertise." ~ 
        <i className='text-yellow-500'> WriteWise</i>
        </p>
        <button
    onClick={() => window.location.href = "/getstarted"} 
    className="btn bg-banner rounded-full text-white custom-font-weight !text-[1.2rem] !px-6 !mt-[2.5rem] ">
    Start Writing
</button>
      </div>
    </div>
  )
}

export default Banner