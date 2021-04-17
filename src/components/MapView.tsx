import Box from "@material-ui/core/Box";
import { country_mappings } from "../data/countriy_mappings";
import { data } from "../data/processed_hackathon_data";

export function MapView(props: any) {
  const { value, index } = props;

  const countryMappingsDef = country_mappings.map((countryMapping) => {
    return {
      countryName: countryMapping.Land.trim().toLowerCase(),
      abbreviation: countryMapping.ISO_3166_1,
    };
  });

  const mappedData = data.map((datum) => {
    let cleanCountryName = datum["countries 0"].replace(/(^\s*,)|(,\s*$)/g, "");
    cleanCountryName = cleanCountryName.replace(" (?)", "").toLowerCase();
    const mapping = countryMappingsDef.find(
      (mapping) => mapping.countryName === cleanCountryName
    );
    return {
      data: datum,
      mapping,
    };
  });

  console.log(mappedData);

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
