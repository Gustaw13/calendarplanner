import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ConfirmAlert from "../ConfirmAlert";
import CancelAlert from "../CancelAlert";
import { Event } from "../../types";
import { getDateFromDateString, getTimeFromDateString } from "../../utils";

export default function MyTrainings() {
  const [events, setEvents] = useState<Event[]>([]);
  const getMyEvents = async () => {
    await fetch("http://localhost:8000/get-my-events", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          data.events.sort(
            (a: Event, b: Event) =>
              new Date(a.event_date).valueOf() -
              new Date(b.event_date).valueOf()
          );
          setEvents(data.events);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Upcoming trainings...</Typography>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "center",
          flexWrap: "wrap",
          width: "70%",
          display: "flex",
        }}
      >
        {events.map((event, idx) => {
          const parsedDate = new Date(event.event_date);
          const weekDay = parsedDate.getDay();
          const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          return (
            <Stack key={idx} sx={{ padding: "2rem" }}>
              <Card
                sx={{
                  width: "385px",
                  justifyContent: "center",
                }}
              >
                <CardContent
                  sx={{
                    justifyContent: "center",
                    flexWrap: "wrap",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Stack
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">
                      {dayNames[weekDay]}, {monthNames[parsedDate.getMonth()]}{" "}
                      {parsedDate.getDate()}, {parsedDate.getFullYear()}
                    </Typography>
                    <Typography variant="h6">
                      {getTimeFromDateString(event.event_date)}
                    </Typography>
                  </Stack>
                  <Typography>{event.comment}</Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <ConfirmAlert
                      trainingDateText={`${
                        monthNames[parsedDate.getMonth()]
                      } ${parsedDate.getDate()}, ${getTimeFromDateString(
                        event.event_date
                      )}`}
                    />
                    {/* <CancelAlert /> */}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
