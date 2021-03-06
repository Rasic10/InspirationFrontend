import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonFooter,
  IonButton,
  IonImg,
  IonSpinner,
  IonIcon,
  IonItem,
  IonInput,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
//import ExploreContainer from "../components/ExploreContainer";
import "./Page.scss";
//import SongCard from "../components/SongCard";
//import SongCard2 from "../components/SongCard2";
import SongCard3 from "../components/SongCard3";
import { reader, searchCircleOutline, searchCircleSharp } from "ionicons/icons";
import { API_URL } from "../config";

interface ISong {
  songID: number;
  title: string;
  text: string;
  date: Date;
  userID: number;
  user: {
    firstName: string;
    gender: string;
    lastName: string;
    userName: string;
  };
  fevorite: boolean;
}

const Page: React.FC = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [search, setSearch] = useState("");
  //const [s, setS] = useState([]);

  useEffect(() => {
    sessionStorage.getItem("userName") === null ? page() : pageWithFevorite();
  });

  const page = () => {
    var params: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(API_URL + "/api/Songs", params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        result = [...result].reverse();

        setSongs(result);
      })
      .catch((error) => console.log("error", error));
  };

  const pageWithFevorite = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ userName: sessionStorage.getItem("userName") });

    var params: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "/api/Songs/Fevorite", params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log("prvi");
        return response.json();
      })
      .then((result) => {
        result = [...result].reverse();
        console.log("drugi");
        setSongs(result);
      })
      .catch((error) => console.log("error", error));
    console.log("trece");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonImg
            class="image"
            src="assets/inspiration.png"
            alt="Nature"
          ></IonImg>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonItem id="searchItem">
          <IonIcon ios={searchCircleOutline} md={searchCircleSharp} />
          <IonInput
            id="searchInput"
            type="text"
            placeholder="search song by title"
            onIonChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          ></IonInput>
        </IonItem>

        {/* <ExploreContainer name={name} /> */}
        {/* <SongCard /> */}
        {/* {songs === [] ? (
          <p>Loading...</p>
        ) : (
          <SongCard2 songs={songs} songs1={songs[1]} />
        )} */}
        {/* {s.map((sa) => {
          return <SongCard3 key={sa.songID} songs={[]} songs1={sa} />;
        })} */}

        {songs.length === 0 ? (
          <IonSpinner id="spinner" name="circles" />
        ) : (
          songs.map((song) => {
            return <SongCard3 key={song.songID} song={song} search={search} />;
          })
        )}
      </IonContent>

      <IonFooter>
        {sessionStorage.getItem("userName") === null ? (
          <div></div>
        ) : (
          <IonButton id="addBtn" color="gold" routerLink="/addInspiration">
            Add your inspiration
            <IonIcon slot="start" icon={reader} />
          </IonButton>
        )}
      </IonFooter>
    </IonPage>
  );
};

export default Page;
