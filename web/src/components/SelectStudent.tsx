import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { User } from "../types";

export default function SelectStudent({ students }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, paddingTop: "5px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select your student
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          required
          sx={{}}
          label="Select your student"
          name="studentId"
          id="studentId"
          value={age}
          onChange={handleChange}
        >
          {students.map((student) => (
            <MenuItem
              key={student.id}
              id={student.id.toString()}
              value={student.id}
            >
              {student.first_name} {student.last_name}
            </MenuItem>
          ))}
          {/* <MenuItem id="Michelle" value="Michelle">
            Michelle
          </MenuItem>
          <MenuItem id="Borys" value="Borys">
            Borys
          </MenuItem>
          <MenuItem id="Bruno" value="Bruno">
            Bruno
          </MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
