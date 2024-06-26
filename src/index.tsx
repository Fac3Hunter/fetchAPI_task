import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MessagePage from "./pages/MessagePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:page" element={<App />} />
      <Route path="/messages/:messageId" element={<MessagePage />} />
    </Routes>
  </BrowserRouter>
);
