import Box from "@material-ui/core/Box";
import { country_mappings } from "../data/countriy_mappings";
import { data } from "../data/processed_hackathon_data";

export function StoryView(props: any) {
  const { value, index } = props;

  console.log(data);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}></Box>}
    </div>
  );
}
