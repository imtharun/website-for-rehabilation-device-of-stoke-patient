import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Controller } from "react-hook-form";
import { createTheme, MuiThemeProvider } from "@material-ui/core";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#73D6CA",
      light: "#000",
      // dark: 'YOUR COLOR',
    },
    secondary: {
      main: "#000",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        transitions: "none !important",
      },
    },
  },
});

const MuiDatePicker = ({ control }) => {
  return (
    <section className="max-w-xs w-full mx-auto p-1 pl-0  mt-2">
      <MuiThemeProvider  theme={customTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Controller
            name="Date picker"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <KeyboardDatePicker
                margin="normal"
                
                fullWidth
                placeholder="DD/MM/YYYY"
                id="date-picker-dialog"
                label="Select your DOB"
                format="dd/MM/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                {...rest}
              />
            )}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </section>
  );
};

export default MuiDatePicker;
