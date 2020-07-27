import React, { useState } from "react";
import "./SongCard.css";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonCardContent,
  IonTextarea,
  IonButton,
  IonFooter,
} from "@ionic/react";
import {
  Avatar,
  makeStyles,
  Theme,
  createStyles,
  Snackbar,
} from "@material-ui/core";
import { API_URL } from "../config";
import Alert from "@material-ui/lab/Alert";

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

const SongCardDelete: React.FC<{ song: Song }> = (props) => {
  const classes = useStyles();
  const [text, setText] = useState(props.song.text);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const deleteSong = () => {
    var params: RequestInit = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(API_URL + "/api/Songs/" + props.song.songID, params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        setSnackBarMsg("Usepsno brisanje!");
        setAlertSeverity("success");
        setSnackBarOpen(true);

        return response.json();
      })
      .then((result) => {
        // window.history.pushState(null, "", "/post");
        // window.history.forward();
        // window.history.go();
      })
      .catch((error) => console.log("error", error));
  };

  const editSong = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      songID: props.song.songID,
      title: props.song.title,
      text: text,
      date: props.song.date,
      fevorite: props.song.fevorite,
      userID: props.song.userID,
    });

    var params: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "/api/Songs/" + props.song.songID, params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        setSnackBarMsg("Usepsna izmena!");
        setAlertSeverity("success");
        setSnackBarOpen(true);
      })
      .catch((error) => {
        console.log("error", error);

        setSnackBarMsg("Neuspesna izmena!");
        setAlertSeverity("error");
        setSnackBarOpen(true);
      });
  };

  const snackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <IonCard key={props.song.songID}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={snackBarClose}
      >
        <Alert
          severity={alertSeverity === "success" ? "success" : "error"}
          onClose={() => {
            setSnackBarOpen(false);
          }}
        >
          {snackBarMsg}
        </Alert>
      </Snackbar>

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
          </IonItem>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonCardTitle id="cardTitle">{props.song.title}</IonCardTitle>
        <IonTextarea
          id="cardTextArea"
          rows={4}
          value={text}
          onIonChange={(e) => setText((e.target as HTMLInputElement).value)}
        ></IonTextarea>
      </IonCardContent>
      <IonFooter>
        <IonButton id="editButton" onClick={editSong}>
          Edit
        </IonButton>
        <IonButton id="deleteButton" color="danger" onClick={deleteSong}>
          Delete
        </IonButton>
      </IonFooter>
    </IonCard>
  );
};

export default SongCardDelete;
