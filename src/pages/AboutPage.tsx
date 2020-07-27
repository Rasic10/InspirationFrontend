import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonFooter,
  IonImg,
  IonItem,
  IonTextarea,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./AboutPage.scss";

const AboutPage: React.FC = () => {
  useEffect(() => {});

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
        <IonItem id="itemH1">
          <h1>Inspiration - place for your poetry!</h1>
        </IonItem>
        <IonItem id="itemH4">
          <h4>
            This application is made for creative people of all ages. Here, you
            can read poetry written by other users, save your favourite poems
            and even share your own.
          </h4>
        </IonItem>
        <IonItem id="itemH2">
          <h4 id="italic">
            Become a part of the Inspiration community and awake the creativity
            within yourself!
          </h4>
        </IonItem>
      </IonContent>

      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default AboutPage;
