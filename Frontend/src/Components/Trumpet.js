import "../App.css";
import Nav from "./Nav";
import SongProcessing from "./SongProcessing";

export default function Trumpet() {
  const type = "Trumpet";
  return (
    <div>
      <Nav />
      <div className="banner_trumpet"></div>
      <SongProcessing instrumentType={type} />
    </div>
  );
}
