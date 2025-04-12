import styles from "../../styles/training-widgets.module.scss";

export default function DeadlineDate({ deadline }) {
  //Deadline Date
  const deadline_date = new Date(deadline.deadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const getDuration = (duration) => {
    let timeDegree;
    let finalTime;

    //setup of string formate for duration
    if (duration > 60) {
      timeDegree = "hours";
      finalTime = duration / 60;
    } else if (duration < 60) {
      timeDegree = "mins";
      finalTime = duration;
    } else {
      timeDegree = "hour";
      finalTime = duration / 60;
    }

    //return string
    return `${finalTime} ${timeDegree}`;
  };

  return (
    <div className={styles.training_widgets}>
      <div className="mx-3 gap-3 mb-1">
        <p className={styles.hr}>{deadline_date}</p>

        {deadline.programs.map((program, index) => {
          //training duration
          const duration = getDuration(program.duration);

          return (
            <div key={index}>
              <p className="fs-5 mb-2">{program.title}</p>
              <div className="d-flex flex-row gap-2 justify-content-start">
                <div className="d-flex flex-fill">
                  <i className="bi bi-clock me-1"></i>
                  <p>{duration}</p>
                </div>
                <div className="d-flex flex-fill">
                  <i className="bi bi-mortarboard me-1"></i>
                  <p>{program.enrolled} enrolled</p>
                </div>
                <div className="d-flex flex-fill">
                  <i className="bi bi-patch-check me-1"></i>
                  <p>{program.completed} complete</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
