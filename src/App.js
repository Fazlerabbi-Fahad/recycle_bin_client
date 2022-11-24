import { RouterProvider } from 'react-router-dom';
import routes from "./Routes/Routes/Routes";
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div data-theme="dark" className='max-w-screen-xl m-auto'>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
