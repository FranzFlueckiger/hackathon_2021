import { AppBar, Tabs, Tab } from "@material-ui/core";
import React from "react";
import "./App.css";
import { country_mappings } from "./data/countriy_mappings";
import { data } from "./data/processed_hackathon_data";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>

      {console.log(data)}
      {country_mappings}
    </>
  );
}

export default App;
