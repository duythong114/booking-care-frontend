import './styles/App.scss';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <div className='app-routes'>
          <AppRoutes />
        </div>
      </Router>

      {/* React-toastify */}
      <ToastContainer
        position="top-center"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
