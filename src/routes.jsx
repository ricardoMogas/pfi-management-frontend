import Root from './pages/root.jsx';
import TestPage from './pages/TestPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
import Login from './components/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import ErrorPage from "./error-page.jsx";
import StudentControl from './pages/StudentControl.jsx';
import VisitRegisterPage from './pages/VisitRegisterPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ReportPage from './pages/ReportPage.jsx';

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        title: "Principal",
        path: "/home",
        element: <HomePage />,
      },
      {
        title: "Control de alumnos",
        path: "/StudentControl",
        element: <StudentControl />,
      },
      {
        title: "Registro de visitas",
        path: "/VisitRegisterPage",
        element: <VisitRegisterPage />,
      },
      {
        title: "Servicios",
        path: "/ServicePage",
        element: <ServicePage />,
      },
      {
        title: "Reportes",
        path: "/ReportPage",
        element: <ReportPage />,
      },
      {
        title: "Información",
        path: "/Info",
        element: <InfoPage />,
      }
      /*
      {
        title: "Test",
        path: "/Test/:id",
        element: <TestPage />,
        errorElement: <ErrorPage />,
      },
      */
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default routes;
