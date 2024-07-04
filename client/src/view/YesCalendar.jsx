import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./components/Components-Calendar-css.css";

import eventPad from "./components/eventPad";
import EventModal from "./components/EventModal";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const YesCalendar = () => {
  const [event, setEvent] = useState(eventPad);
  const [eventSelector, setEventSelector] = useState(null);

  const eventStyle = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  const moverEvents = (data) => {
    const { start, end } = data;
    const updatedEvents = event.map((event) => {
      if (event.id === data.event.id) {
        return { ...event, start: new Date(start), end: new Date(end) };
      }
      return event;
    });

    setEvent(updatedEvents);
  };

  const handleEventClick = (event) => {
    setEventSelector(event);
  };
  const handleEventClose = () => {
    setEventSelector(null);
  };

  return (
    <div className="mainScreen">
      <div className="toolbar">
        <p>Tools</p>
      </div>
      <DragAndDropCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={event}
        localizer={localizer}
        resizable
        onEventDrop={moverEvents}
        onEventResize={moverEvents}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyle}
        className="calendar"
      />
      {eventSelector && (
        <EventModal event={eventSelector} onClose={handleEventClose} />
      )}
    </div>
  );
};
export default YesCalendar;
