import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // Import Quill styles
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Import highlight.js styles
import { Blog } from '../../../../contextAPI/Context';
import Preview from '../../../Home/WritePost/Preview';

const Edit = () => {
  const { updateData, title, setTitle, desc, setDesc, bannerImg, setBannerImg } = Blog();
  const [previewBanner, setPreviewBanner] = useState(bannerImg || null);
  const [publish, setPublish] = useState(false); // State to toggle preview

  // Quill formats
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'code-block',
  ];

  // Quill modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['code-block'],
    ],
  };

  // Handle banner image change
  // const handleBannerChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setBannerImg(file); // Update the banner image state
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewBanner(reader.result); // Preview the image
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Highlight code blocks dynamically
  const handleEditorChange = (content, delta, source, editor) => {
    setDesc(content);

    // Apply syntax highlighting to code blocks
    if (source === 'user') {
      const codeBlocks = document.querySelectorAll('.ql-editor pre.ql-syntax');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  };

  // Initialize fields when updateData is available
  useEffect(() => {
    if (updateData) {
      setTitle(updateData.title);
      setDesc(updateData.desc);
      setPreviewBanner(updateData.bannerImg || null);
    }
  }, [updateData, setTitle, setDesc]);

  return (
    <div className="min-h-screen bg-header2">
      <section className="write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
        {/* Banner Image Section */}
        {/* <div className="mb-5">
          {previewBanner ? (
            <img
              src={previewBanner}
              alt="Banner Preview"
              className="object-cover w-full h-64 mb-3 rounded-md"
            />
          ) : (
            <p className="mb-3 text-gray-400">No banner image available. Upload one below:</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="text-white"
          />
        </div> */}

        {/* Title Input */}
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 text-4xl text-white outline-none bg-header2"
        />

        {/* Description Editor */}
        <ReactQuill
          placeholder="Edit here..."
          className="!text-[4rem] my-3 text-white text-2xl"
          theme="bubble"
          value={desc}
          onChange={handleEditorChange}
          formats={formats}
          modules={modules}
        />

           </section>
    </div>
  );
};

export default Edit;
