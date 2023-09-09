import styles from "./Layout.module.css";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/nodesymb.png"
import textlogo from "../assets/textlogo.jpg"

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.phoneWrapper}>
        <nav className={styles.nav}>
          <Link to="/" className={styles["logo-wrap"]}>
            <img src={logo} className={styles.logo} />
            <img src={textlogo} className={styles["text-logo"]} />
          </Link>
          <ul className={styles.ul}>
            <li>
              <Link to="/createtweet" className={styles["link-create-post"]}>Create Post</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </section>
    </div>
  );
}