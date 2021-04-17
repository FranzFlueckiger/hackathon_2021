import Box from "@material-ui/core/Box";
import { country_mappings } from "../data/countriy_mappings";
import { data } from "../data/processed_hackathon_data";
import brigitte from "../imgs/Brigitte.png";
import ketty from "../imgs/Ketty Lester.png";
import liebesbrief from "../imgs/MBK_Liebesbrief_Blog.jpg";
import metronomy from "../imgs/Metronomy.png";
import moma from "../imgs/Moma.png";
import nick from "../imgs/Nick Cave.png";

const imageMetaData = [
  {
    src: brigitte,
    url: "www.google.ch",
  },
  {
    src: ketty,
    url: "",
  },
  {
    src: liebesbrief,
    url: "",
  },
  {
    src: metronomy,
    url: "",
  },
  {
    src: moma,
    url: "",
  },
  {
    src: nick,
    url: "",
  },
];

export function StoryView(props: any) {
  const { value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div>
          {imageMetaData.map((imageMetaData) => {
            return (
              <div>
                <img src={imageMetaData.src} />;
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
