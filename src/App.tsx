import { AppBar, Tabs, Tab } from "@material-ui/core";
import React from "react";
import "./App.css";
import { MapView } from "./components/MapView";
import { StoryView } from "./components/StoryView";
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
          <Tab label="Maps" />
          <Tab label="Story" />
        </Tabs>
      </AppBar>
      <MapView value={value} index={0}>
        Item One
      </MapView>
      <StoryView value={value} index={1}>
        Item Two
      </StoryView>
    </>
  );
}

export default App;
