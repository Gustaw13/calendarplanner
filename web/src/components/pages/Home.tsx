import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Home() {
  const getCurrentUser = async () => {
    await fetch("http://localhost:8000/get-current-user", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Stack
      direction={"column"}
      sx={{
        alignItems: "center",

        height: "100%",
        width: "100%",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          alignItems: "center",
          padding: "0 2rem",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">How it works?</Typography>
        <Typography align="center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, ad ea
          suscipit vitae numquam corrupti sint enim voluptates assumenda
          repellendus quaerat placeat neque deleniti dolore doloribus nemo vel
          vero. Facere. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Quis autem officia sint id voluptatibus ducimus ex maiores, aut
          natus blanditiis harum dolor quidem laboriosam excepturi, aliquid hic
          corrupti architecto ipsa! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quis fugiat necessitatibus culpa placeat, quasi
          neque fuga? Repellat aliquid velit eos cumque adipisci, ea dolores rem
          accusamus, quia perferendis commodi numquam! Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Suscipit enim, neque obcaecati
          corrupti facilis perferendis repudiandae explicabo iste nam quam quod
          eligendi ullam natus totam perspiciatis voluptatum in itaque aliquam!
        </Typography>
      </Stack>
    </Stack>
  );
}
