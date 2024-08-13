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
        components={{
          toolbar: CustomToolbar
        }}
        className="calendar"
      />
      {eventSelector && (
        <EventModal event={eventSelector} onClose={handleEventClose} />
      )}
    </div>
  );
};

const CustomToolbar = ({label, onView, onNavigate, views}) => {
  const handleNavigate = (action) => {
onNavigate(action);
  }
const [itemText, setItemText] = useState('month');



  return (
   <div className="toolbar-container">
    <h1 className="monthYear">{label}</h1>
<div className="dirtop">
<div className="dropdown">
<button className="btn btn-secondary dropdown-toggle" type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false'>{itemText}</button>
<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  {views.map((view,index) => (
    <div key={index}>
      <li>
        <button className="dropdown-item" onClick={()=>onView(view) + setItemText(view)}>{view}</button>
      </li>
      {index === 2 &&<hr className="dropdown-divider"></hr>}

    </div>
  ))}

</ul>

</div>

<div className="toolbar-navigation" style={{marginLeft:'15px'}}>
  <button className="btn btn-secondary btn-1s mr-2 border-0" onClick={() => handleNavigate('TODAY')}>Today</button>
  <button className="btn btn-sm mr-2 text-secondary" onClick={() => handleNavigate('PREV')} style={{marginLeft: '15px'}}><i class='bi bi-caret-left'></i></button>
  <button className="btn btn-sm mr-2 text-secondary" onClick={() => handleNavigate('NEXT')}><i class='bi bi-caret-right'></i></button>


</div>
</div>
   </div>
  )
}
export default YesCalendar;
