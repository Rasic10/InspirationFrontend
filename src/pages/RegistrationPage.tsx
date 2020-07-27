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
import "./RegistrationPage.scss";
import {
  personCircleOutline,
  personCircleSharp,
  lockClosedSharp,
  lockClosedOutline,
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

const RegistrationPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  // POST request for register
  const register = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      password: password,
    });

    var params: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "/api/Users", params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        sessionStorage.setItem("userID", result.userID);
        sessionStorage.setItem("userName", result.userName);
        sessionStorage.setItem("firstName", result.firstName);
        sessionStorage.setItem("lastName", result.lastName);
        sessionStorage.setItem("gender", result.gender);

        console.log(result);

        setSnackBarMsg("Registration successful!");
        setAlertSeverity("success");
        setSnackBarOpen(true);

        window.history.pushState(null, "", "/home");
        window.history.forward();
        window.history.go();
      })
      .catch((error) => {
        console.log("error", error);

        setSnackBarMsg("Registration failed!");
        setAlertSeverity("error");
        setSnackBarOpen(true);
      });
  };

  const snackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <IonPage id="register">
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

      <IonContent class="registerContent">
        <IonTitle id="registerTitle">Member Registration</IonTitle>
        <IonItem id="registerItemUser">
          <IonIcon ios={personCircleOutline} md={personCircleSharp} />
          <IonInput
            id="username"
            type="text"
            placeholder="username"
            onIonChange={(e) =>
              setUserName((e.target as HTMLInputElement).value)
            }
          ></IonInput>
        </IonItem>
        <IonItem id="registerItemUser">
          <IonIcon ios={textOutline} md={textSharp} />
          <IonInput
            id="firstname"
            type="text"
            placeholder="first name"
            onIonChange={(e) =>
              setFirstName((e.target as HTMLInputElement).value)
            }
          ></IonInput>
        </IonItem>
        <IonItem id="registerItemUser">
          <IonIcon ios={textOutline} md={textSharp} />
          <IonInput
            id="lastname"
            type="text"
            placeholder="last name"
            onIonChange={(e) =>
              setLastName((e.target as HTMLInputElement).value)
            }
          ></IonInput>
        </IonItem>
        <IonItem id="registerItemUser">
          <IonRadioGroup value="male">
            <IonItem>
              <IonIcon md={maleOutline} ios={maleSharp} />
              <IonLabel class="labelRegistar">male</IonLabel>
              <IonRadio
                slot="end"
                color="success"
                value="male"
                onIonFocus={(e) =>
                  setGender((e.target as HTMLInputElement).value)
                }
              ></IonRadio>
            </IonItem>
            <IonItem>
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
        <IonItem id="registerItemPass">
          <IonIcon ios={lockClosedOutline} md={lockClosedSharp} />
          <IonInput
            id="password"
            type="password"
            placeholder="password"
            onIonChange={(e) =>
              setPassword((e.target as HTMLInputElement).value)
            }
          ></IonInput>
        </IonItem>

        <IonButton class="registerButton" color="success" onClick={register}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegistrationPage;
