import styles from "../../styles/page-header.module.scss";

export default function PageHeader({ title }) {
  return <h1 className={styles.header}>{title}</h1>;
}
