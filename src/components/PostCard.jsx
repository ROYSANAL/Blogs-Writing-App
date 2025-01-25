import React from "react";
import databaseStorageService from "../appwrite/configure";
import { Link } from "react-router-dom";

//new syntax of ${}, appwrite ka syntax hai1
function PostCard({ $id, title, featuredImage }) {
  return (
    //new syntax of ${}, appwrite ka syntax hai
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={databaseStorageService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
