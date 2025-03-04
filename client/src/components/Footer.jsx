export default function Footer(props) {
  return (
    <footer className={` ${props.noNavbar ? "no-nav" : ""}`}>
      <p className="footer-name">lumen</p>
      <span className="footer-copy">&copy; Copyright 2025</span>
    </footer>
  );
}
