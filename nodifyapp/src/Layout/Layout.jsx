import styles from "./Layout.module.css";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.phoneWrapper}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/twitterpost">Twitter Post</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </section>
    </div>
  );
}