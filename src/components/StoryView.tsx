import brigitte from "../imgs/Brigitte.png";
import ketty from "../imgs/Ketty Lester.png";
import liebesbrief from "../imgs/MBK_Liebesbrief_Blog.jpg";
import moma from "../imgs/Moma.png";
import nick from "../imgs/Nick Cave.png";

const imageMetaData: {
  src: string;
  url: string;
  description: string;
}[] = [
  {
    src: brigitte,
    url: "www.google.ch",
    description: "",
  },
  {
    src: ketty,
    url: "",
    description: "",
  },
  {
    src: liebesbrief,
    url: "",
    description: "",
  },
  {
    src: moma,
    url: "",
    description: "",
  },
  {
    src: nick,
    url: "",
    description: "",
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
              <div
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  left: "20px",
                  right: "100px",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    left: "20px",
                    maxWidth: "80%",
                    height: "auto",
                  }}
                  src={imageMetaData.src}
                />
                ;
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
