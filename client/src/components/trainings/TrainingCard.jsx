import React from "react";
import CardContainer from "../basic-components/CardContainer";

export default function TrainingCard() {
  return (
    <div className="training-card-container">
      <div className="d-flex flex-row px-4 pt-4">
        <div>
          <p className="fw-bold fs-4 mb-0">Training Title</p>
          <p className="mb-0">January 1st, 2025 at 1:00pm</p>
          <div className="d-flex flex-row">
            <i class="bi bi-clock"></i>
            <p className="mx-2">1 hour</p>
          </div>
        </div>
      </div>
      <div className="row border-black border-top m-3 p-3 text-center">
        <div className="col">
          <p className="fw-bold fs-4 m-0">10</p>
          <p>Complete</p>
        </div>
        <div className="col">
          <p className="fw-bold fs-4 m-0">20</p>
          <p>Enrolled</p>
        </div>
        <div className="col">
          <p className="fw-bold fs-4 m-0">30</p>
          <p>Assigned</p>
        </div>
      </div>
    </div>
  );
}
