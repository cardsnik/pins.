import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import { logout } from "../../../entities/user";
import { ROUTES } from "../../../shared/config/routes";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login);
  };

  return (
    <header className={styles.header}>
      <NavLink to={ROUTES.feed} end className={styles.logo}>
        pins<span className={styles.logoDot}>•</span>
      </NavLink>
      <nav className={styles.nav}>
        <NavLink
          to={ROUTES.feed}
          end
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        >
          Лента
        </NavLink>
        <NavLink
          to={ROUTES.favorites}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        >
          Избранное
        </NavLink>
      </nav>
      <button type="button" className={styles.logoutButton} onClick={handleLogout}>
        Выйти
      </button>
    </header>
  );
}

export default Header;
