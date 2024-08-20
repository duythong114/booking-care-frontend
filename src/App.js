import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header"
import Sidebar from './components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';

function Layout() {
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  return (
    <div className="layout-container">
      {!hideLayout && isAuthenticated && (
        <>
          <div className="header-content">
            <Header />
          </div>
          <div className="sidebar-content">
            <Sidebar />
          </div>
        </>
      )}
      <div className={hideLayout ? 'full-content' : 'main-content'}>
        <AppRoutes />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
