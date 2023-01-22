import React, { FC } from 'react';
import { Card } from 'flowbite-react';
import PostType from '../types/posts';

interface Props {
  post: PostType,
  className?: string,
  isPanel?: boolean,
  deletePost?: (postId: string) => void;
  setCurrentPost?: React.Dispatch<React.SetStateAction<PostType | undefined>>
  openModal?: () => void
}

const Post:FC<Props> = ({
  post, className, isPanel, deletePost, setCurrentPost, openModal,
}) => (
  <div className={className}>
    <Card>
      <h3 className="text-lg">{post.message}</h3>
      <div className="flex">
        <p className="text-gray-500 text-xs">{post.userEmail}</p>
        {post.createdAt && <p className="text-gray-500 text-xs ml-3">{new Date(post.createdAt).toDateString()}</p>}
      </div>
      {(isPanel && deletePost && setCurrentPost && openModal) && (
        <div className="flex">
          <span onClick={() => deletePost(post._id ?? '')} className="flex-initial text-gray-500 text-xs cursor-pointer underline text-red-400">Delete</span>
          <span
            onClick={() => {
              setCurrentPost(post);
              openModal();
            }}
            className="flex-initial text-gray-500 text-xs ml-2 cursor-pointer underline text-violet-400"
          >
            Edit
          </span>
        </div>
      )}
    </Card>
  </div>
);

export default Post;
