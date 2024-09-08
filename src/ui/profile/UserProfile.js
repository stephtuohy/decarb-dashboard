"use client";

import { useState, useEffect } from "react";
import { fetchUserPosts } from "../../services/api";
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Loader from "../core/Loader";
import ErrorModal from "../core/ErrorModal";

const UserProfile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const closeError = () => {
    setError(null);
  };

  useEffect(() => {
    const cachedPosts = localStorage.getItem(`user-posts-${user.id}`);

    if (cachedPosts) {
      setPosts(JSON.parse(cachedPosts));
      setLoading(false);
    } else {
      fetchUserPosts(user.id)
        .then((data) => {
          setPosts(data);
          localStorage.setItem(`user-posts-${user.id}`, JSON.stringify(data));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [user.id]);

  if (loading) return <Loader />;
  if (error) return <ErrorModal message={error} onClose={closeError} />;

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <div className="infoContainer">
          <EnvelopeIcon className="icon" /> <p>{user.email}</p>
        </div>
        <div className="infoContainer">
          <PhoneIcon className="icon" /> <p>{user.phone}</p>
        </div>
        <div className="infoContainer">
          <GlobeAltIcon className="icon" /> <p>{user.website}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Posts:</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="postCard">
              <h3 className="font-semibold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
