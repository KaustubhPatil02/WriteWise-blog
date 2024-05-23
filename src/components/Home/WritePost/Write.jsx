import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // import styles
import Preview from './Preview';
import { Blog } from '../../../contextAPI/Context';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // choose the style you like

const Write = () => {
  const { publish, setPublish } = Blog();
  const [ideas, setIdeas] = useState('');
  const [title, setTitle] = useState('');

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'code-block' // add this for code block
  ];

  const handleEditorChange = (content, delta, source, editor) => {
    setIdeas(content);
  
    // If the change was caused by the user
    if (source === 'user') {
      // Get the unprivileged editor instance
      const unprivilegedEditor = editor.getContents();
  
      // For each code block
      unprivilegedEditor.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'object' && op.insert['code-block']) {
          // Get the code block element
          const codeBlock = document.querySelector('.ql-editor .ql-syntax');
  
          // If the code block exists
          if (codeBlock) {
            // Highlight the code block
            hljs.highlightBlock(codeBlock);
          }
        }
      });
    }
  };


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['code-block'], // add this for code block
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Handle form submission logic here
  };

  return (
    <div className='bg-header2 min-h-screen'>
      <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
      <form onSubmit={handleSubmit}>
        <input
          className='text-5xl outline-none w-full bg-post1 text-white'
          value={title}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
  value={ideas}
  onChange={handleEditorChange}
  className='write my-10 text-white'
  theme="bubble"
  placeholder='Push your Content or Ideas here!'
  formats={formats}
  modules={modules}
/>
        <div className={`${publish ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200`}>
          <Preview
            setPublish={setPublish}
            title={title}
            ideas={ideas}
          />
        </div>
        <button type="submit" style={{ display: 'none' }}></button> {/* Hidden submit button */}
      </form>
    </section>
    </div>
  );
}

export default Write;