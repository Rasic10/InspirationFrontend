import * as React from "react";
import "./SongCard.css";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonCardContent,
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import { Avatar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { heartOutline, heartSharp } from "ionicons/icons";
import { API_URL } from "../config";

interface Song {
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blue: {
      color: "#fafafa",
      backgroundColor: "#1a237e",
    },
    red: {
      color: "#fafafa",
      backgroundColor: "#b71c1c",
    },
  })
);

const SongCard3: React.FC<{ song: Song; search: string }> = (props) => {
  const classes = useStyles();
  const [heart, setHeart] = React.useState(
    props.song.fevorite === true ? heartSharp : heartOutline
  );

  const clickHeart = () => {
    if (heart === heartOutline) funHeartSharp();
    if (heart === heartSharp) funHeartOutline();
  };

  const funHeartSharp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      songID: props.song.songID,
      userID: sessionStorage.getItem("userID"),
    });

    var params: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "/api/Fevorites/", params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        setHeart(heartSharp);
      })
      .catch((error) => console.log("error", error));
  };

  const funHeartOutline = () => {
    var params: RequestInit = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      API_URL +
        `/api/Fevorites/${props.song.songID}-${sessionStorage.getItem(
          "userID"
        )}`,
      params
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        setHeart(heartOutline);
      })
      .catch((error) => console.log("error", error));
  };

  return props.search === "" ||
    (props.search !== "" &&
      props.song.title.toLowerCase().indexOf(props.search.toLowerCase()) !==
        -1) ? (
    <IonCard key={props.song.songID}>
      <IonCardHeader>
        <IonCardTitle>
          <IonItem>
            <Avatar
              className={
                props.song.user.gender === "male" ? classes.blue : classes.red
              }
            >
              {props.song.user.firstName[0]}
              {props.song.user.lastName[0]}
            </Avatar>
            <IonLabel id="cardLabel">
              {props.song.user.firstName} {props.song.user.lastName}{" "}
            </IonLabel>

            {sessionStorage.getItem("userName") === null ? (
              ""
            ) : (
              <IonIcon
                id="cardIcon"
                ios={heart}
                md={heart}
                onClick={clickHeart}
              ></IonIcon>
            )}
          </IonItem>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonCardTitle id="cardTitle">{props.song.title}</IonCardTitle>
        <IonTextarea
          id="cardTextArea"
          rows={4}
          value={props.song.text}
          readonly
        ></IonTextarea>
      </IonCardContent>
    </IonCard>
  ) : (
    <div></div>
  );
};

export default SongCard3;
