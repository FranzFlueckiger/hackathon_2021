import { country_mappings } from "../data/countriy_mappings";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import Slider from "@material-ui/core/Slider";
import { data } from "../data/data";
import ReactTooltip from "react-tooltip";

type MapViewProps = {
  value: any;
  index: number;
};

export function MapView(props: MapViewProps) {
  const { value, index } = props;

  const [range, setRange] = React.useState<number[]>([1900, 2022]);

  const [content, setContent] = React.useState("");

  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const colorScale = scaleLinear<string>()
    .domain([0, 3.5])
    .range(["#F3B9C8", "#DB2955"]);

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

  const filteredData = mappedData.filter((datum) => {
    return datum.data.Jahr >= range[0] && datum.data.Jahr <= range[1];
  });

  const handleChange = (event: any, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        left: "20px",
        right: "20px",
        top: "20px",
        position: "relative",
        width: "95%",
      }}
    >
      {value === index && (
        <div>
          <h1 style={{ fontSize: 50 }}>Mapping a Collection</h1>
          <Slider
            value={range}
            onChange={handleChange}
            max={2022}
            min={1900}
            step={1}
            valueLabelDisplay="on"
            style={{
              width: "40%",
              top: "40px",
              left: "20px",
              border: "#DB2955",
            }}
          />
          <ComposableMap
            style={{
              position: "relative",
              width: "95%",
            }}
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147,
            }}
          >
            <ZoomableGroup>
              <Sphere
                stroke="#E4E5E6"
                strokeWidth={0.5}
                id={"mysphere"}
                fill={"white"}
              />
              <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
              {filteredData.length > 0 && (
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const d = filteredData.find(
                        (s) => s.mapping?.abbreviation === geo.properties.ISO_A3
                      );
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={
                            d ? colorScale(Math.log(d.data.count)) : "#F5F4F6"
                          }
                          onMouseEnter={() => {
                            const { NAME, POP_EST } = geo.properties;
                            setContent(`${NAME} — ${POP_EST}`);
                          }}
                          onMouseLeave={() => {
                            setContent("");
                          }}
                          style={{
                            default: {
                              outline: "none",
                            },
                            hover: {
                              outline: "none",
                              stroke: "#000",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              )}
            </ZoomableGroup>
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
