import "../App.css";
import Nav from "./Nav";
import SongProcessing from "./SongProcessing";

export default function Voilin() {
  const type = "Violin";

  return (
    <div>
      <Nav />
      <div className="banner_voilin"></div>
      <SongProcessing instrumentType={type} />
    </div>
  );
}
