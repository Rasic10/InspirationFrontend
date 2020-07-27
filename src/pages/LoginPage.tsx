import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonFooter,
  IonButton,
  IonInput,
  IonItem,
  IonIcon,
  IonLabel,
  IonImg,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import "./LoginPage.scss";
import {
  personCircleOutline,
  personCircleSharp,
  lockClosedSharp,
  lockClosedOutline,
} from "ionicons/icons";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { API_URL } from "../config";

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  // POST request for login
  const login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ userName: userName, password: password });

    var params: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "/api/Users/Login", params)
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
        //sessionStorage.setItem("password", result.password);

        setSnackBarMsg("Login successful!");
        setAlertSeverity("success");
        setSnackBarOpen(true);

        window.history.pushState(null, "", "/home");
        window.history.forward();
        window.history.go();
      })
      .catch((error) => {
        console.log("error", error);

        setSnackBarMsg("Login failed!");
        setAlertSeverity("error");
        setSnackBarOpen(true);
      });
  };

  const snackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <IonPage id="login">
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

      <IonContent class="loginContent">
        <IonTitle id="loginTitle">Member Login</IonTitle>
        <IonItem id="loginItemUser">
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
        <IonItem id="loginItemPass">
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
        <IonButton class="loginButton" color="success" onClick={login}>
          Log in
        </IonButton>
      </IonContent>

      <IonFooter>
        <IonItem>
          <IonLabel>Don't have an account?</IonLabel>
          <a href="/register">Create an account</a>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
