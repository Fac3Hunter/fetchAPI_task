import { useEffect, useState } from "react";
import Message from "./components/Message";
import { useNavigate, useParams } from "react-router-dom";

interface Message {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { page } = useParams();
  const pageNumber = page ? parseInt(page) : 1;
  const [paginationCounter, setPaginationCounter] = useState<number>(
    10 * pageNumber
  );
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com" + "/posts"
        );
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        const data = await response.json();

        navigate(`../${paginationCounter / 10}`, { replace: true });
        setMessages(data.slice(0, paginationCounter));
        setLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationCounter, navigate]);

  // Обработчик события скролла
  const handleScroll = debounce(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      !loading &&
      paginationCounter < 50
    ) {
      setPaginationCounter(paginationCounter + 10);
      navigate(`../${paginationCounter / 10}`, { replace: true });
    }
  }, 100);

  // Подписываемся на событие скролла при монтировании компонента
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [paginationCounter, loading]);

  return (
    <>
      <h1 className="text-center font-bold m-5 text-xl"> Список Сообщений </h1>
      <div className="flex items-center justify-center ">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <Message
                title={message.title}
                body={message.body}
                id={message.id}
              />
            </li>
          ))}
        </ul>
      </div>
      {paginationCounter >= 50 && paginationCounter < 100 && (
        <div className="flex mb-5 items-center justify-center">
          <button
            className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setPaginationCounter(paginationCounter + 10);
              navigate(`../${paginationCounter / 10}`, { replace: true });
            }}
          >
            Загрузить Ещё
          </button>
        </div>
      )}
    </>
  );
}

export default App;

function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
