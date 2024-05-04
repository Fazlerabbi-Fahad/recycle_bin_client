import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes/Routes";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="max-full m-auto">
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
