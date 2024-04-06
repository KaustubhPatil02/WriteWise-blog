import React from 'react'
import Users from './UsersToCheck/Users'
import Posts from '../common_components/Posts/Posts'

const Home = () => {
  return (
    <div className='text-white bg-post1 min-h-screen'>
      <section className='size flex flex-col md:flex-row gap-[1rem] relative '>
        {/* left */}
        <div className='flex-1 py-10 mb-[4rem]'>
          <Posts />
        </div>
        <div className='md:w-[24rem] p-10 border-t md:border-l border-gray-500 block'>
          <h3>Check out these users on the web</h3>
        <Users />
        </div>
      </section>
    </div>
  )
}

export default Home

