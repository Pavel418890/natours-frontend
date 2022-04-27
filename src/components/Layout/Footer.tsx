import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img
          src={`/logo-green.png`}
          alt="Natours Logo"
          width={150}
          height={30}
        />
      </div>
      <ul className={styles.nav}>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">Download Apps</a>
        </li>
        <li>
          <a href="#">Become a guide</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <p className={styles.copyright}>
        &copy; Core stylization by Jonas Schmedtmann.
      </p>
    </footer>
  );
};
export default Footer;
