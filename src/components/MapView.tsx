import Box from "@material-ui/core/Box";
import { country_mappings } from "../data/countriy_mappings";
import { data } from "../data/processed_hackathon_data";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

export function MapView(props: any) {
  const { value, index } = props;

  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    //@ts-ignore
    .range(["#ffedea", "#ff5233"]);

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

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {
        value === index && (
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
                    const countryGrouped = mappedData.reduce<
                      Record<string, number>
                    >((acc: Record<string, number>, datum) => {
                      const abbr = datum.mapping?.abbreviation;
                      if (abbr && acc[abbr]) {
                        acc[abbr]++;
                      } else if (abbr) {
                        acc[abbr] = 0;
                      }
                      return acc;
                    }, {});
                    const d = mappedData.find(
                      (s) => s.mapping?.abbreviation === geo.properties.ISO_A3
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        //@ts-ignore
                        fill={d ? colorScale(1) : "#F5F4F6"}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ComposableMap>
        )
        /* <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
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
      }
    </div>
  );
}
