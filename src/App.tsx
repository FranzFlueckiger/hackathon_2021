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
      <AppBar
        position="static"
        style={{ right: "0px", left: "0px", backgroundColor: "#54494B" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Map" />
          <Tab label="Write me a love letter" />
        </Tabs>
      </AppBar>
      <h3 style={{ left: "20px", position: "relative" }}>
        The spatial evolvement of a Museums’ collection
      </h3>
      <MapView value={value} index={0}></MapView>
      <StoryView value={value} index={1}></StoryView>
      <div
        style={{
          position: "relative",
          top: "20px",
          left: "20px",
          width: "95%",
        }}
      >
        Visualization based on metadata of circa 75’000 objects from the
        European Collection of the Museum der Kulturen Basel, Switzerland.
        Provided by the MKB for the Swiss Open Cultural Data Hackathon 2021.
        Data available online here:
        https://opendata.swiss/de/dataset/sammlung-europa There may be
        inconsistencies on different levels, as errors and omissions occurred
        both when the objects were first cataloged and when the catalogues were
        transcribed into the database. Terminologies contained therein may today
        be inaccurate, outdated, or offensive. Museum der Kulturen Base (MKB)
      </div>
    </>
  );
}

export default App;
