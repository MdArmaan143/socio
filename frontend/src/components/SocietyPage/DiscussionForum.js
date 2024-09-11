import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DiscussionItem from './DiscussionItem';

const DiscussionForum = () => {
  const { collegeName, societyName } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [isMemberOrCreator, setIsMemberOrCreator] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`/societies/${collegeName}/${societyName}/discussions`, { withCredentials: true })
      .then(response => {
        setDiscussions(response.data.discussions);
        const { isMember, isCreator } = response.data;

        if (isMember || isCreator) {
          setIsMemberOrCreator(true);
        } else {
          setErrorMessage('To access the discussion forum, you must join the society.');
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          setErrorMessage('To access the discussion forum, you must join the society.');
        } else {
          console.error('Error fetching discussions:', err);
        }
      });
  }, [collegeName, societyName]);

  // Handle reordering discussions when like count increases
  const handleLikeAnimation = (discussionId) => {
    setDiscussions((prevDiscussions) => 
      prevDiscussions
        .map(discussion => discussion._id === discussionId ? { ...discussion, likes: discussion.likes + 1 } : discussion)
        .sort((a, b) => b.likes - a.likes) 
    );
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 mt-2">Discussion <span className='text-indigo-700'>Forum</span></h2>
      
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <Link to={`/societies/${collegeName}/${societyName}/add-discussion`} className="bg-indigo-500 text-white px-4 py-2 rounded font-bold ">
          Add Discussion
          </Link>

          <div className="mt-6 space-y-4">
            {discussions.map((discussion) => (
              <DiscussionItem
                key={discussion._id}
                discussion={discussion}
                collegeName={collegeName}
                societyName={societyName}
                handleLikeAnimation={handleLikeAnimation}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DiscussionForum;
