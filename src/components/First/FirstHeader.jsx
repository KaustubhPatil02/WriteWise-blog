// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../../data'
import Auth from './AuthModal/Auth';
import { MdTypeSpecimen } from "react-icons/md";
import SearchBlogs from '../Home/Header-components/SearchBlogs';


const FirstHeader = () => {

  const [isActive, setIsActive] = useState(false);
  // const [authModel, setAuthModel] = useState(false);
  const [modal, setModal] = useState(false);


  useEffect(() => {
    const scroll = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scroll);
  }, []);


  return (
    <header className={`border-b border-black sticky top-0 z-50 text-white
    ${isActive ? "bg-header2 " : "bg-header2 "}
    transition-all duration-500`}>
      <div className='size h-[70px] flex items-center justify-between'>
        <div className='flex items-center gap-9'>
        <Link to={"/"}>
          <h1 className='text-4xl font-bold'>WriteWise</h1>
        </Link>
        <SearchBlogs className="pl-7 text-black" />
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex items-center gap-5 flex-col">
            {nav.map((link, i) => (
              <Link key={i} to={link.path}>
                {link.title}
                <MdTypeSpecimen />
              </Link>
            ))}
          </div>
          <div className="relative">
            
            <Auth modal={modal} setModal={setModal} />
    
          <button
            onClick={() => setModal(true)}
            className={` text-white rounded-full px-3 p-2 text-sm font-semibold
            ${isActive ?"bg-banner text-black " : "bg-black1"}
            `}>
            Get Started
          </button>
        </div>
        </div>
      </div>
    </header>
  )
}

export default FirstHeader