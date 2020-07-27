import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButton,
  IonInput,
  IonItem,
  IonIcon,
  IonImg,
  IonToolbar,
  IonLabel,
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";
import React, { useState } from "react";
import "./ProfilePage.scss";
import {
  personCircleOutline,
  personCircleSharp,
  textOutline,
  textSharp,
  maleSharp,
  maleOutline,
  femaleOutline,
  femaleSharp,
} from "ionicons/icons";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { API_URL } from "../config";

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState(
    sessionStorage.getItem("firstName")
  );
  const [lastName, setLastName] = useState(sessionStorage.getItem("lastName"));
  const [gender, setGender] = useState(sessionStorage.getItem("gender"));
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  // POST request for profile
  const profile = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userID: sessionStorage.getItem("userID"),
      userName: sessionStorage.getItem("userName"),
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      password: sessionStorage.getItem("password"),
    });

    var params: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "/api/Users/" + sessionStorage.getItem("userID"), params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        sessionStorage.setItem(
          "firstName",
          firstName === null ? "" : firstName
        );
        sessionStorage.setItem("lastName", lastName === null ? "" : lastName);
        sessionStorage.setItem("gender", gender === null ? "" : gender);

        setSnackBarMsg("Successfully modified!");
        setAlertSeverity("success");
        setSnackBarOpen(true);
      })
      .catch((error) => {
        console.log("error", error);

        setSnackBarMsg("Unsuccessfully!");
        setAlertSeverity("error");
        setSnackBarOpen(true);
      });
  };

  const snackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <IonPage id="profile">
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

      <IonHeader>
        <IonToolbar>
          <IonImg
            class="image"
            src="assets/inspiration.png"
            alt="Nature"
          ></IonImg>
        </IonToolbar>
      </IonHeader>

      <IonContent class="profileContent">
        <IonTitle id="profileTitle">Profile</IonTitle>
        <IonItem id="profileItemUser">
          <IonIcon ios={personCircleOutline} md={personCircleSharp} />
          <IonInput
            id="username"
            type="text"
            placeholder="username"
            value={sessionStorage.getItem("userName")}
            disabled
          ></IonInput>
        </IonItem>
        <IonItem id="profileItemUser">
          <IonIcon ios={textOutline} md={textSharp} />
          <IonInput
            id="firstname"
            type="text"
            placeholder="first name"
            value={firstName}
            onIonChange={(e) =>
              setFirstName((e.target as HTMLInputElement).value)
            }
          ></IonInput>
        </IonItem>
        <IonItem id="profileItemUser">
          <IonIcon ios={textOutline} md={textSharp} />
          <IonInput
            id="lastname"
            type="text"
            placeholder="last name"
            value={lastName}
            onIonChange={(e) =>
              setLastName((e.target as HTMLInputElement).value)
            }
          ></IonInput>
        </IonItem>
        <IonItem id="profileItemUser">
          <IonRadioGroup value={gender}>
            <IonItem>
              <IonIcon md={maleOutline} ios={maleSharp} />
              <IonLabel class="labelRegistar">male</IonLabel>
              <IonRadio
                id="radio"
                slot="end"
                color="success"
                value="male"
                onIonFocus={(e) =>
                  setGender((e.target as HTMLInputElement).value)
                }
              ></IonRadio>
            </IonItem>
            <IonItem id="radio">
              <IonIcon md={femaleOutline} ios={femaleSharp} />
              <IonLabel class="labelRegistar">female</IonLabel>
              <IonRadio
                slot="end"
                color="success"
                value="female"
                onIonFocus={(e) =>
                  setGender((e.target as HTMLInputElement).value)
                }
              ></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonItem>

        <IonButton class="profileButton" color="success" onClick={profile}>
          Change profil
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
