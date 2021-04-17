import Box from "@material-ui/core/Box";
import { data } from "../data/processed_hackathon_data";

export function MapView(props: any) {
  const { value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{data}</Box>}
    </div>
  );
}
