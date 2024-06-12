import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Scheduler from "react-mui-scheduler";
import AddEvent from "../AddEvent";
import { User } from "../../types";
import { getDateFromDateString, getTimeFromDateString } from "../../utils";
import ClickedEvent from "../ClickedEvent";

export default function BookSession() {
  const [state] = useState({
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "mon", // or sun
      defaultMode: "month", // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
    },
    alertProps: {
      open: true,
      color: "info", // info | success | warning | error
      severity: "info", // info | success | warning | error
      message: "Click on a date, to add an event.",
      // showActionButton: true,
      showNotification: true,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      // showSwitchModeButtons: true,
      showDatePicker: true,
    },
  });
  const [students, setStudents] = useState<User[]>([]);
  const getAllStudents = async (): Promise<User[] | void> => {
    return await fetch("http://localhost:8000/get-all-students", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json().then((data) => {
          console.log(data);
          setStudents(data.students);
          return data.students;
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [events, setEvents] = useState<Event[]>([]);
  const getMyEvents = async (s: User[]) => {
    await fetch("http://localhost:8000/get-all-events", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setEvents(
            data.events.map((event) => {
              const user = s.find((st) => st.id === event.student_id);

              return {
                id: event.id,
                label: "Training " + user?.first_name,
                groupLabel: user?.first_name,
                user: user?.first_name,
                color: "#72ad74",
                comment: event.comment,
                startHour: getTimeFromDateString(event.event_date),
                date: getDateFromDateString(event.event_date),
                createdAt: event.created_date,
                createdBy: event.trainer_id,
              };
            })
          );
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const calendarLoadData = async () => {
    const s = await getAllStudents();

    if (s) {
      getMyEvents(s);
    }
  };
  useEffect(() => {
    calendarLoadData();
  }, []);

  useEffect(() => {
    console.log("test", events);
  }, [events]);

  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [currentlySelectedDay, setCurrentlySelectedDay] = useState();

  const [eventWindowOpen, setEventWindowOpen] = useState(false);
  const [currentlyClickedEvent, setCurrentlyClickedEvent] = useState();

  const handleCellClick = (event, row, day) => {
    // Otwieranie okienka z wyborem godziny + nazwa wydarzenia
    setCurrentlySelectedDay(day);
    setCreateWindowOpen(true);
  };

  const handleEventClick = (event, item) => {
    // Do something...
    setCurrentlyClickedEvent(item);
    setEventWindowOpen(true);
    console.log("eventTest", item);
  };

  const handleEventsChange = (item) => {
    // Do something...
  };

  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
  };

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <AddEvent
        calendarLoadData={calendarLoadData}
        students={students}
        selectedDate={currentlySelectedDay}
        open={createWindowOpen}
        setOpen={setCreateWindowOpen}
      />
      {currentlyClickedEvent && (
        <ClickedEvent
          currentlyClickedEvent={currentlyClickedEvent}
          open={eventWindowOpen}
          setOpen={setEventWindowOpen}
        />
      )}

      {events.length > 0 && (
        <Scheduler
          locale="en"
          events={events}
          legacyStyle={false}
          options={state?.options}
          alertProps={state?.alertProps}
          toolbarProps={state?.toolbarProps}
          onEventsChange={handleEventsChange}
          onCellClick={handleCellClick}
          onTaskClick={handleEventClick}
          onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
        />
      )}
    </Stack>
  );
}
