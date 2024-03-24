import React from "react";
import { Link } from "react-router-dom";

interface MessageProps {
  title: string;
  body: string;
  id: number;
}

const Message = ({ title, body, id }: MessageProps) => {
  return (
    <div className="border bg-gray-200 border-gray-300 p-4 rounded-md w-80 h-40 overflow-y-auto max-h-80 m-4">
      <h2 className="text-lg font-semibold mb-2">
        <Link to={`/messages/${id}`}>{title}</Link>
      </h2>
      <p className="text-gray-700">{body}</p>
    </div>
  );
};

export default Message;
