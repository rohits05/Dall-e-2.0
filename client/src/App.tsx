import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import logo from './asset/logo.svg';
import { CreatePost, Home } from './pages';
const App = () => {
  return (
    <BrowserRouter>
      <header className="sticky top-0 w-full flex justify-between items-center backdrop-blur-md sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          to="/create-post"
          className="sticky top-0 font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md backdrop-blur-md">
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;