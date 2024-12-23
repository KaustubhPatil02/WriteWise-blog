import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // Import styles
import Preview from './Preview';
import { Blog } from '../../../contextAPI/Context';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Highlight.js styles for code blocks

const Write = () => {
  const { publish, setPublish } = Blog();
  const [ideas, setIdeas] = useState('');
  const [title, setTitle] = useState('');

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'code-block', // Add this for code block
  ];

  const handleEditorChange = (content) => {
    setIdeas(content);

    // Automatically highlight code blocks after content changes
    setTimeout(() => {
      document.querySelectorAll('.ql-editor pre').forEach((block) => {
        hljs.highlightElement(block);
      });
    }, 0);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['code-block'], // Add this for code block
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-header2">
      <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full text-5xl text-white outline-none bg-post1"
            value={title}
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill
            value={ideas}
            onChange={handleEditorChange}
            className="my-10 text-white write"
            theme="bubble"
            placeholder="Push your Content or Ideas here!"
            formats={formats}
            modules={modules}
          />
          <div className={`${publish ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200`}>
            <Preview setPublish={setPublish} title={title} ideas={ideas} />
          </div>
          <button type="submit" style={{ display: 'none' }}></button> {/* Hidden submit button */}
        </form>
      </section>
    </div>
  );
};

export default Write;
