import React, { FC, useEffect, useState } from 'react';
import {
  Button, Label, Modal, Textarea,
} from 'flowbite-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import PostType from '../types/posts';

interface Props {
  addPostState: (post: PostType) => void;
  onClose: () => void;
  show: boolean;
  email: string | null;
  editPost?: (postId: string, postData: PostType) => void;
  currentPost?: PostType;
}
const AddPostModal: FC<Props> = ({
  onClose, show, addPostState, email, editPost, currentPost,
}) => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (currentPost) {
      setMessage(currentPost.message);
    }
  }, [currentPost]);

  const handleAdd = async (newPost: PostType) => {
    const response = await axios.post(`${import.meta.env.VITE_HOST}/posts`, newPost, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credential': true,
      },
    });
    if (response.status !== 201) {
      toast.error('Could not create post');
      return;
    }
    addPostState(response.data.data);
    toast.success('Added new post');
    onClose();
  };

  const handleSubmit = async () => {
    if (message && email) {
      const newPost: PostType = {
        message,
        userEmail: email,
      };
      if (editPost && currentPost) {
        await editPost(currentPost._id ?? '', newPost);
      } else {
        await handleAdd(newPost);
      }
      setMessage('');
    } else {
      toast.error('There is no message or email saved');
    }
  };

  return (
    <Modal
      show={show}
      onClose={() => {
        setMessage('');
        onClose();
      }}
    >
      <Modal.Header>
        <p className="mb-2">Add Posts</p>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="message1"
                value="Post message"
              />
            </div>
            <Textarea
              id="message1"
              placeholder="Write a message here"
              value={message}
              onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
              required
            />
          </div>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPostModal;
