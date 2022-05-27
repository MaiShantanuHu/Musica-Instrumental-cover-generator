import "../App.css";
import Nav from "./Nav";
import SongProcessing from "./SongProcessing";

export default function Flute() {
  const type = "Flute";

  return (
    <div>
      <Nav />
      <div className="banner_flute"></div>
      <SongProcessing instrumentType={type} />
    </div>
  );
}
