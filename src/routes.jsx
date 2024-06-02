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
        iconClass: "bi bi-house",
        element: <HomePage />,
      },
      {
        title: "Control de alumnos",
        path: "/StudentControl",
        iconClass: "bi bi-person",
        element: <StudentControl />,
      },
      {
        title: "Registro de visitas",
        path: "/VisitRegisterPage",
        iconClass: "bi bi-person-plus",
        element: <VisitRegisterPage />,
      },
      {
        title: "Servicios",
        path: "/ServicePage",
        iconClass: "bi bi-gear",
        element: <ServicePage />,
      },
      {
        title: "Reportes",
        path: "/ReportPage",
        iconClass: "bi bi-file-earmark-bar-graph",
        element: <ReportPage />,
      },
      {
        title: "Información",
        path: "/Info",
        iconClass: "bi bi-info-circle",
        element: <InfoPage />,
      },
      {
        title: "Test",
        path: "/test",
        iconClass: "bi bi-info-circle",
        element: <TestPage />,
      }
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default routes;
