import { useContext, useEffect, useState } from "react";
import styles from "../../../styles/simple-modal.module.scss";
import { AppContext } from "../../../App";
import CardContainer from "../../basic-components/CardContainer";

export default function SimpleModal() {
  const { isModalOpen, setIsModalOpen, modalData, setModalData } =
    useContext(AppContext);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("dont-scroll");
    } else {
      document.body.classList.remove("dont-scroll");
    }
  }, [isModalOpen, modalData]);

  useEffect(() => {
    if (isModalOpen) {
      setData(modalData);

      setTimeout(() => {
        setLoaded(true);
      }, 1);
    } else {
      setModalData(null);
      setLoaded(false);
    }
  }, [isModalOpen, modalData]);

  return (
    <>
      {isModalOpen ? (
        <div
          className={`${styles.background_container} 
          ${loaded ? "swift-loaded swift-loading" : "swift-loading"}`}
        >
          <div
            className={styles.close_background}
            onClick={() => setIsModalOpen(false)}
          />
          <CardContainer extraClasses={styles.modal_container}>
            <div className={styles.modal_header}>
              <button onClick={() => setIsModalOpen(false)}>X</button>
            </div>
            <div className={styles.modal_body}>{modalData}</div>
          </CardContainer>
        </div>
      ) : null}
    </>
  );
}
