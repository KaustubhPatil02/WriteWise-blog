import { useState } from 'react'
import { BiDotsHorizontal } from "react-icons/bi";
import DropDown from '../../../../utility/DropDown';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../Firebase/firebase';
import { Blog } from '../../../../contextAPI/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { HiDotsHorizontal } from "react-icons/hi";

const Actions = ({ postId, title, desc}) => {
  const {currUser, setUpdateData } = Blog();
  const [showDrop, setShowDrop] = useState(false);
  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  const navigate = useNavigate(null);

  const handleDelete = async () => {
    try {
      const ref = doc(db, "writewise-posts", postId);
      const likeRef = doc(db, "posts", postId, "likes", currUser?.uid);
      const commentRef = doc(db, "posts", postId, "comments", currUser?.uid);
      const savedPostRef = doc(
        db,
        "users",
        currUser?.uid,
        "savedPost",
        postId
      );
      await deleteDoc(ref);
      await deleteDoc(likeRef);
      await deleteDoc(commentRef);
      await deleteDoc(savedPostRef);
  
      toast.success("post has been removed");
      setShowDrop(false);
      navigate("/");
    } catch (error) {
      toast.success(error.message);
    }
  };
  
  const handleEdit = () => {
    navigate(`/editPost/${postId}`);
    setUpdateData({ title, description: desc });
  };
  return (
    <div className='relative'>
      <button onClick={handleClick}><HiDotsHorizontal className='text-3xl'/></button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
        <Button click={handleEdit} title="Edit"/>
        <Button click={handleDelete} title="Delete"/>
      </DropDown >
    </div>
  )
}

export default Actions

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left
    ${title === "Delete" ? "text-red-600 font-semibold" : ""}
    `}>
      {title}
    </button>
  );
};




