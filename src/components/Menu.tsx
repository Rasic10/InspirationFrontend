import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonFooter,
  IonButton,
  IonImg,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import {
  heartOutline,
  heartSharp,
  homeOutline,
  homeSharp,
  logIn,
  helpCircleOutline,
  helpCircleSharp,
  documentTextOutline,
  documentTextSharp,
  personSharp,
  personOutline,
  logOut,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
  {
    title: "Post",
    url: "/post",
    iosIcon: documentTextOutline,
    mdIcon: documentTextSharp,
  },
  {
    title: "Favorites",
    url: "/favorite",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "About",
    url: "/about",
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp,
  },
];

const logout = async () => {
  sessionStorage.clear();
  // window.history.pushState(null, "", "/home");
  // window.history.forward();
  // window.history.go();
};

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonImg class="image" src="assets/inspiration.png"></IonImg>
          </IonListHeader>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  hidden={
                    (appPage.title === "Post" ||
                      appPage.title === "Profile" ||
                      appPage.title === "Favorites") &&
                    sessionStorage.getItem("userName") === null
                      ? true
                      : false
                  }
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          <IonFooter id="footerMenu">
            <IonMenuToggle autoHide={false}>
              {sessionStorage.getItem("userName") === null ? (
                <div>
                  <IonButton
                    class="logInOut"
                    color="success"
                    routerLink="/login"
                  >
                    Log in
                    <IonIcon slot="start" icon={logIn} />
                  </IonButton>
                </div>
              ) : (
                <IonButton
                  class="logInOut"
                  color="danger"
                  onClick={logout}
                  routerLink="/home"
                >
                  Log out
                  <IonIcon slot="start" icon={logOut} />
                </IonButton>
              )}
            </IonMenuToggle>
          </IonFooter>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
