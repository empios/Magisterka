import React, { FC, useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostType from '../types/posts';
import Post from './Post';
import AddPostModal from './AddPostModal';

interface Props {

}
const UserPostTable: FC<Props> = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const email = localStorage.getItem('user');
  const [show, setShow] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostType | undefined>();
  const addPostToState = (post: PostType) => {
    setPosts([...posts, post]);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/posts/${email}`, {
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

  const deletePost = async (postId: string) => {
    const response = await axios.delete(`${import.meta.env.VITE_HOST}/posts/${postId}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credential': true,
      },
    });
    if (response.status !== 200) {
      toast.error('Could not delete post');
    } else {
      const newPostsArray = posts.filter((post) => post._id !== postId);
      setPosts(newPostsArray);
      toast.success('Deleted post');
    }
  };

  const editPost = async (postId: string, postData: PostType) => {
    const response = await axios.put(`${import.meta.env.VITE_HOST}/posts/${postId}`, postData, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credential': true,
      },
    });
    if (response.status !== 200) {
      toast.error('Could not delete post');
    } else {
      const newPostsArray = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            message: postData.message,
          };
        } return post;
      });
      setPosts(newPostsArray);
      toast.success('Post edited');
    }
    setShow(false);
    setCurrentPost(undefined);
  };

  return (
    <div className="h-full">
      <div className="flex justify-end mr-4 mt-10">
        <Button color="success" onClick={() => setShow(true)}>Add Post</Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mx-14 justify-items-center mt-16">
        {posts.map((post) => <Post isPanel openModal={() => setShow(true)} deletePost={deletePost} setCurrentPost={setCurrentPost} key={post._id} post={post} className="w-full" />)}
      </div>
      <AddPostModal
        email={email}
        show={show}
        onClose={() => setShow(false)}
        addPostState={addPostToState}
        editPost={editPost}
        currentPost={currentPost}
      />
    </div>
  );
};

export default UserPostTable;
