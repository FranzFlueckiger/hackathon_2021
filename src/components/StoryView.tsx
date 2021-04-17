import Box from "@material-ui/core/Box";
import { country_mappings } from "../data/countriy_mappings";

export function StoryView(props: any) {
  const { value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{country_mappings}</Box>}
    </div>
  );
}
