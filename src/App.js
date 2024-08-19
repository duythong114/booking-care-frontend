import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Header from "./components/Header/Header"
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app-container">
      <Router>
        <div className="header-content">
          <Header />
        </div>
        <div className="sidebar-content">
          <Sidebar />
        </div>
        <div className='main-content'>
          <AppRoutes />
        </div>
      </Router>

      {/* React-toastify */}
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
    </div >
  );
}

export default App;
