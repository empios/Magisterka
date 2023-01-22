import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Pathnames from './consts/pathnames';

const router = createBrowserRouter([
  {
    path: Pathnames.HOME,
    element: <FirstPage />,
  },
  {
    path: Pathnames.SECOND,
    element: <SecondPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
);
