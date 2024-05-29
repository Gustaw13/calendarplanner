import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Scheduler from "react-mui-scheduler";
import AddEvent from "../AddEvent";

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
      message: "Work in progress, calendar doesn't work yet:(",
      showActionButton: true,
      showNotification: true,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      /* showSwitchModeButtons: true, */
      showDatePicker: true,
    },
  });

  const events = [
    {
      id: "event-1",
      label: "Trening Bruno",
      groupLabel: "Bruno",
      user: "Bruno",
      color: "#f28f6a",
      startHour: "11:00",
      endHour: "12:00",
      date: "2024-05-10",
      createdAt: new Date(),
      createdBy: "Gustaw Kałek",
    },
    {
      id: "event-2",
      label: "Trening Borys",
      groupLabel: "Borys",
      user: "Borys",
      color: "#099ce5",
      startHour: "17:00",
      endHour: "18:00",
      date: "2024-05-09",
      createdAt: new Date(),
      createdBy: "Gustaw Kałek",
    },
    {
      id: "event-3",
      label: "Trening Michelle",
      groupLabel: "Michelle",
      user: "Michelle",
      color: "#263686",
      startHour: "10:00",
      endHour: "11:00",
      date: "2024-05-05",
      createdAt: new Date(),
      createdBy: "Gustaw Kałek",
    },
  ];
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [currentlySelectedDay, setCurrentlySelectedDay] = useState();

  const handleCellClick = (event, row, day) => {
    // Otwieranie okienka z wyborem godziny + nazwa wydarzenia
    console.log(day);
    setCurrentlySelectedDay(day);
    setCreateWindowOpen(true);
  };

  const handleEventClick = (event, item) => {
    // Do something...
    console.log("testttt");
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
      <AddEvent open={createWindowOpen} setOpen={setCreateWindowOpen} />
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
    </Stack>
  );
}
