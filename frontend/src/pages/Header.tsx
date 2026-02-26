import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import '../css/Header.css';

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="header-container">
      <Link className="logo" to="/dashboard">
        Logo
      </Link>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Header;
