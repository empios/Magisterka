import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PostType from '../types/posts';
import Post from '../components/Post';
import LogLess from '../components/LogLess';
import FooterPage from '../components/Footer';

const FirstPage = () => {
  const userToken = localStorage.getItem('token');
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/posts`, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Credential': true,
        },
      });
      if (response.status !== 200) {
        toast.error('Could not fetch data');
        return;
      }
      setPosts(response.data.data);
    })();
  }, []);

  return (
    <div className="h-[calc(100vh-5rem)]">
      <NavBar userToken={userToken} />
      {userToken ? (
        <Card className="lg:mx-64 mt-10">
          <h1 className="mt-5 text-center text-xl">Recent Post List</h1>
          <div className="grid h-full place-items-center mb-10">
            <div className="w-96">
              {posts.map((post) => <Post post={post} className="mt-2" />)}
            </div>
          </div>
        </Card>
      ) : <LogLess />}
      <FooterPage />
    </div>
  );
};

export default FirstPage;
