import React from "react";
import "./Components-Calendar-css.css";

const EventModal = ({ event, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{event.title}</h2>
        <p>{event.desc}</p>
        <p>Data rozpoczęcia:{event.start.toLocaleString()}</p>
        <p>Data zakończenia:{event.end.toLocaleString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventModal;
