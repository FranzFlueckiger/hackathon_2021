import { AppBar, Tabs, Tab } from "@material-ui/core";
import React from "react";
import "./App.css";
import { MapView } from "./components/MapView";
import { StoryView } from "./components/StoryView";

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
          <Tab label="Map" />
          <Tab label="Write me a love letter" />
        </Tabs>
      </AppBar>
      <MapView value={value} index={0}></MapView>
      <StoryView value={value} index={1}></StoryView>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
        }}
      >
        Here goes the reference to Museum Basel
      </div>
    </>
  );
}

export default App;
