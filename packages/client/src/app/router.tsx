import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AppLayout from './AppLayout.tsx';
import { Hotel } from './routes';
import { Country } from './routes/Country.tsx';
import { City } from './routes/City.tsx';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <App/>,
      },
      {
        path: '/hotel/:id',
        element: <Hotel/>
      },
      {
        path: '/country/:id',
        element: <Country/>
      },
      {
        path: '/city/:id',
        element: <City/>
      },
    ],
  },
]);