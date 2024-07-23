import { useEffect } from 'react';
import './assets/styles/main.scss';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
// import Contact from './pages/Contact';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PortfolioDetails from './pages/PortfolioDetails';
import ScrollToTop from './components/common/ScrollToTop';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import PortfolioEdit from './pages/admin/PortfolioEdit';
import CommonLayout from './layouts/CommonLayout';
import AdminLayout from './layouts/AdminLayout';
import PortfolioList from './pages/admin/PortfolioList';
import PortfolioCreate from './pages/admin/PortfolioCreate';
import Traffic from './pages/admin/Traffic';
import UserList from './pages/admin/UserList';
import UserCreate from './pages/admin/UserCreate';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  useEffect(() => {
    document.title = "JENNY's Portfolio | Home";
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <AuthProvider>

            <ScrollToTop />
            
            <Routes>
              {/* ============== Common ============== */}
              <Route path="/" element={<CommonLayout><Home /></CommonLayout>} />
              <Route path="/portfolio" element={<CommonLayout><Portfolio /></CommonLayout> } />
              <Route path="/portfolio-details/:id" element={<CommonLayout><PortfolioDetails /></CommonLayout>} />
              {/* <Route path="/contact" element={<Contact /> } /> */}
              <Route path="/login" element={<CommonLayout><Login /></CommonLayout>} />
            
              <Route path="*" element={<CommonLayout><PageNotFound /></CommonLayout>} />
              
              {/* ============== Admin ==============*/}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout><PortfolioList /></AdminLayout>} />
                <Route path="/admin/portfolio-list" element={<AdminLayout><PortfolioList /></AdminLayout>} />
                <Route path="/admin/portfolio-create" element={<AdminLayout><PortfolioCreate /></AdminLayout>} />
                <Route path="/admin/portfolio-edit" element={<AdminLayout><PortfolioEdit /></AdminLayout>} />
                <Route path="/admin/user-list" element={<AdminLayout><UserList /></AdminLayout>} />
                <Route path="/admin/user-create" element={<AdminLayout><UserCreate /></AdminLayout>} />
                <Route path="/admin/traffic" element={<AdminLayout><Traffic /></AdminLayout>} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
