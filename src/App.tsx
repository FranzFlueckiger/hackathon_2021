import "./App.css";
import { country_mappings } from "./data/countriy_mappings";
import { data } from "./data/processed_hackathon_data";

function App() {
  return (
    <>
      {console.log(data)}
      {country_mappings}
    </>
  );
}

export default App;
