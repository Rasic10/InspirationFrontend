import React, { useState } from "react";
import "./AddInspirationPage.scss";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonImg,
  IonContent,
  IonItem,
  IonIcon,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import {
  sendOutline,
  sendSharp,
  newspaperOutline,
  newspaperSharp,
} from "ionicons/icons";
import { API_URL } from "../config";

const AddInspirationPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // POST request for add song
  const addInspiration = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      text: text,
      date: "2012-12-10T00:00:00",
      user: {
        userName:
          sessionStorage.getItem("userName") === null
            ? "Nepostoji profil"
            : sessionStorage.getItem("userName"),
      },
    });

    var params: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
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
        console.log(result);
        window.history.pushState(null, "", "/home");
        window.history.forward();
        window.history.go();
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

      <IonContent id="postContent">
        <IonItem id="postTitle">
          <IonIcon ios={sendOutline} md={sendSharp} />
          <IonInput
            id="inputTitle"
            type="text"
            placeholder="title"
            onIonChange={(e) => setTitle((e.target as HTMLInputElement).value)}
          ></IonInput>
        </IonItem>
        <IonItem id="postText">
          <IonIcon ios={newspaperOutline} md={newspaperSharp} />
          <IonTextarea
            id="inputTextArea"
            placeholder="text"
            rows={10}
            onIonChange={(e) => setText((e.target as HTMLInputElement).value)}
          ></IonTextarea>
        </IonItem>
        <IonButton
          id="addButton"
          class="addInspirationBtn"
          color="success"
          onClick={addInspiration}
          //routerLink="/home"
        >
          Add inspiration
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddInspirationPage;
