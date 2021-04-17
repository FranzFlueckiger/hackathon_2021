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

  const countryGrouped = Object.entries(
    mappedData.reduce<Record<string, number>>(
      (acc: Record<string, number>, datum) => {
        const abbr = datum.mapping?.abbreviation;
        if (abbr && acc.hasOwnProperty(abbr)) {
          const currentValue = acc[abbr];
          acc[abbr] = currentValue + 1;
        } else if (abbr) {
          acc[abbr] = 0;
        }
        return acc;
      },
      {}
    )
  );

  console.log(countryGrouped);

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
            {countryGrouped.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = countryGrouped.find(
                      (s) => s[0] === geo.properties.ISO_A3
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={(() => {
                          console.log(d);
                          return d ? colorScale(d[1]) : "#F5F4F6";
                        })()}
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
