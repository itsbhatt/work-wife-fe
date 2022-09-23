import { Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import NotFound from './components/NotFound';

// pages
import EventsPage from './pages/Events';

const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: 'dashboard',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EventsPage />
      },
      {
        path: '*',
        element: <Navigate to="/404" />
      }
    ]
  },
  {
    path: '*',
    element: (
      <NotFound />
    )
  }
];

export default routes;