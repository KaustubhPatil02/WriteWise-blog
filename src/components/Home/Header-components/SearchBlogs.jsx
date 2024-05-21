import { useState } from 'react'
// import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Modal from '../../../utility/Modal';
import { Blog } from '../../../contextAPI/Context';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const SearchBlogs = ({modal, setModal,}) => {

  const [searchInput, setSearchInput] = useState('')
  const { postData } = Blog(); 

  const searchResults = postData && postData?.filter((post)=> post?.title.toLowerCase().includes(searchInput.toLowerCase()) );
  const navigate = useNavigate();
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
            value={searchInput} onChange={e => setSearchInput(e.target.value)}
            className='bg-transparent outline-none py-[0.4rem] text-sm w-[20rem]'
            type="text" placeholder='Search WriteWise Blog for Posts'
          />
          {searchInput !== "" && (
            <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
              <div className='absolute right-0 left-0 top-full bg-white shadow rounded-md'>
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((post, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          navigate(`/post/${post?.id}`);
                          setSearchInput("");
                        }}
                        className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                        <h2 className="line-clamp-1 capitalize text-sm font-bold">
                          {post.title}
                        </h2>
                        <div
                          className="text-xs text-gray-500 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.desc }}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 p-3">No Post Found</p>
                )}

              </div>
            </div>
          
          )}
        </div>
        </div>
    </Modal>
  </>
  )
}

export default SearchBlogs