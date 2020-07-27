import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonSpinner,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
//import ExploreContainer from "../components/ExploreContainer";
import "./Page.scss";
//import SongCard from "../components/SongCard";
//import SongCard2 from "../components/SongCard2";
import SongCardDelete from "../components/SongCardDelete";
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

const PostPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [songs, setSongs] = useState<ISong[]>([]);
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
        return response.json();
      })
      .then((result) => {
        result = [...result].reverse();
        setSongs(result);
      })
      .catch((error) => console.log("error", error));
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {songs.length === 0 ? (
          <IonSpinner id="spinner" name="circles" />
        ) : (
          songs.map((song) => {
            return song.userID.toString() ===
              sessionStorage.getItem("userID") ? (
              <SongCardDelete key={song.songID} song={song} />
            ) : (
              ""
            );
          })
        )}
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
