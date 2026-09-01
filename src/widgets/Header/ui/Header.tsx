import { useLayoutEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useAppDispatch } from "../../../app/store";
import { logout } from "../../../entities/user";
import { ROUTES } from "../../../shared/config/routes";
import { toastGoodbye } from "../../../shared/lib/toast";
import { useTheme } from "../../../shared/lib/theme/ThemeContext";
import { useTranslation } from "../../../shared/lib/i18n/LanguageContext";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      if (navRef.current) {
        gsap.fromTo(
          navRef.current.children,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.12, delay: 0.2, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toastGoodbye(t.toast.goodbye);
    navigate(ROUTES.login);
  };

  return (
    <header className={styles.header}>
      <NavLink to={ROUTES.feed} end className={styles.logo} ref={logoRef}>
        pins<span className={styles.logoDot}>•</span>
      </NavLink>
      <nav className={styles.nav} ref={navRef}>
        <NavLink
          to={ROUTES.feed}
          end
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        >
          {t.nav.feed}
        </NavLink>
        <NavLink
          to={ROUTES.favorites}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        >
          {t.nav.favorites}
        </NavLink>
      </nav>
      <button
        type="button"
        className={styles.iconButton}
        onClick={toggleTheme}
        aria-label={theme === "dark" ? t.theme.toLight : t.theme.toDark}
        title={theme === "dark" ? t.theme.toLight : t.theme.toDark}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <button
        type="button"
        className={styles.langButton}
        onClick={toggleLocale}
        aria-label="RU / EN"
        title="RU / EN"
      >
        {locale === "ru" ? "RU" : "EN"}
      </button>
      <button type="button" className={styles.logoutButton} onClick={handleLogout}>
        {t.nav.logout}
      </button>
    </header>
  );
}

export default Header;
