import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Message {
  userId: number;
  title: string;
  body: string;
}

const MessagePage = () => {
  const [message, setMessage] = useState<Message | null>(null);
  const { messageId } = useParams<{ messageId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${messageId}`
        );
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        const data: Message = await response.json();
        setMessage(data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData();
  }, [messageId]);

  if (!message) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl">{message.title}</h1>
        <p className="text-center text-xl">{message.body}</p>
      </div>
    </>
  );
};

export default MessagePage;
