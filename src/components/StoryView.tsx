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
    description: `Transkription Liebesbrief VI 8763
vorderes Herz
In den Sternen steht geschrieben,
der Mensch soll Glauben, Hoffen Lieben.
Dieses Blät(t)chen noch so klein
spricht doch, vergiss nicht mein.
 
hinteres Herz
Wo Glaube, da Liebe, wo Liebe, da Friede, wo Segen, da Gott.
Wo Gott, kein Tod.
Gott meine Hoffnung.
Die Liebe weist (?) dem Herzen ein,
so wirt's ein schöner Tempel sein.`,
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
      style={{
        left: "20px",
        right: "20px",
        top: "20px",
        position: "relative",
      }}
    >
      {value === index && (
        <div>
          <h1 style={{ fontSize: 50 }}>Write Me a Loveletter</h1>
          <a href={"https://www.mkb.ch/de/museum/sammlung/dtl/vi-8763.html"}>
            <h1 style={{ fontStyle: "italic", color: "#000" }}>
              Basler Liebesbrief
            </h1>
          </a>
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
                <div>{imageMetaData.description}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
