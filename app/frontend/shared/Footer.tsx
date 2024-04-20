// Importing the necessary icons and styles
import { Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.waves}>
        {/* Consider adding SVG or CSS-based waves here for visual flair */}
      </div>
      <ul className={styles["social-icon"]}>
        <li className={styles["social-icon__item"]}>
          <a href="https://www.facebook.com" aria-label="Facebook">
            <FacebookIcon />
          </a>
        </li>
        <li className={styles["social-icon__item"]}>
          <a href="https://www.twitter.com" aria-label="Twitter">
            <Twitter />
          </a>
        </li>
        <li className={styles["social-icon__item"]}>
          <a href="https://www.linkedin.com" aria-label="LinkedIn">
            <LinkedIn />
          </a>
        </li>
        <li className={styles["social-icon__item"]}>
          <a href="https://www.instagram.com" aria-label="Instagram">
            <Instagram />
          </a>
        </li>
      </ul>
      <ul className={styles.menu}>{/* Link elements */}</ul>
      <p>&copy;2024 3Lance | All Rights Reserved</p>
    </footer>
  );
}
