import { country_mappings } from "../data/countriy_mappings";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import Slider from "@material-ui/core/Slider";
import { data } from "../data/data";

type MapViewProps = {
  value: any;
  index: number;
};

export function MapView(props: MapViewProps) {
  const { value, index } = props;

  const [range, setRange] = React.useState<number[]>([1900, 2022]);

  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const colorScale = scaleLinear<string>()
    .domain([0, 150])
    .range(["#ffedea", "#ff5233"]);

  const countryMappingsDef = country_mappings.map((countryMapping) => {
    return {
      countryName: countryMapping.Land.trim().toLowerCase(),
      abbreviation: countryMapping.ISO_3166_1,
    };
  });

  const mappedData = data.map((datum) => {
    let cleanCountryName = datum["countries 0"].toLowerCase();
    const mapping = countryMappingsDef.find(
      (mapping) => mapping.countryName === cleanCountryName
    );
    return {
      data: datum,
      mapping,
    };
  });

  console.log(mappedData);

  const handleChange = (event: any, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div>
          <Slider
            value={range}
            onChange={handleChange}
            valueLabelDisplay="auto"
            max={2022}
            min={1900}
            style={{
              left: "20px",
              right: "20px",
              width: "40%",
            }}
          />
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147,
            }}
          >
            <Sphere
              stroke="#E4E5E6"
              strokeWidth={0.5}
              id={"mysphere"}
              fill={"white"}
            />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            {mappedData.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = mappedData.find(
                      (s) => s.mapping?.abbreviation === geo.properties.ISO_A3
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d.data.count) : "#F5F4F6"}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ComposableMap>
        </div>
      )}
    </div>
  );
}

/* /* <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */
