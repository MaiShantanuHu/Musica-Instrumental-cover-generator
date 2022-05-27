import { useState } from "react";
import "../App.css";
import { storage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";

export default function SongProcessing({ instrumentType }) {
  const { currentUser } = useAuth();
  const uId = currentUser.uid;

  const [songFile, setSongFile] = useState(null);
  const [songUrl, setSongUrl] = useState(null);
  const [convertedsongUrl, setConvertedSongUrl] = useState(null);
  const [showSpinner, setSpinner] = useState(false);
  const [showSpinner2, setSpinner2] = useState(false);

  function getVocalsUrl(res, name) {
    if (res === "Success") {
      const dataRef = ref(storage, uId + "/vocals/" + name);
      getDownloadURL(dataRef).then((url) => {
        setSongUrl(url);
        setSpinner(false);
      });
    }
  }

  function getIntrumentalSongUrl(res, name) {
    if (res === "Success") {
      const dataRef = ref(storage, uId + "/instrumental/" + name);
      getDownloadURL(dataRef).then((url) => {
        console.log("urlOutput:", url);
        setConvertedSongUrl(url);
        setSpinner2(false);
      });
    }
  }

  // Spleeter ngrok tunnel link
  async function handleSubmit(e) {
    e.preventDefault();
    setSpinner(true);
    console.log(songFile);
    const formData = new FormData();
    formData.append("audio_file", songFile);
    formData.append("uid", uId);
    const options = {
      method: "POST",
      body: formData,
    };
    const data = await fetch(
      "https://8ddc-34-86-245-109.ngrok.io/upload",
      options
    );
    const result = await data.json();

    getVocalsUrl(result, songFile.name);
  }

  // DDSP ngrok tunnel link
  async function handleConvertSubmit(e) {
    e.preventDefault();
    setSpinner2(true);
    const formData = new FormData();
    formData.append("songfileName", songFile.name);
    formData.append("instrumentType", instrumentType);
    formData.append("uid", uId);
    const options = {
      method: "POST",
      body: formData,
    };
    const data = await fetch(
      "https://d90b-34-105-53-70.ngrok.io/convert",
      options
    );
    const result = await data.json();
    if (convertedsongUrl != null) {
      setConvertedSongUrl(null);
    }
    getIntrumentalSongUrl(result, songFile.name);
    console.log(convertedsongUrl);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="uploadButton">
          <input type="file" onChange={(e) => setSongFile(e.target.files[0])} />
          <button type="submit" className="uploadSongButton">
            EXTRACT VOCALS
          </button>
        </div>
      </form>
      {songUrl != null ? (
        <audio controls preload="metadata">
          <source src={songUrl} type="audio/mpeg" />
        </audio>
      ) : null}

      {showSpinner ? (
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        ""
      )}

      {songUrl != null ? (
        <form onSubmit={handleConvertSubmit}>
          <div className="convertButton">
            <button type="submit" className="convertSongButton">
              CONVERT VOCALS
            </button>
          </div>
        </form>
      ) : null}

      {showSpinner2 ? (
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        ""
      )}

      {songUrl !== null && convertedsongUrl !== null ? (
        <audio controls preload="metadata">
          <source src={convertedsongUrl} type="audio/mpeg" />
        </audio>
      ) : null}
    </div>
  );
}
