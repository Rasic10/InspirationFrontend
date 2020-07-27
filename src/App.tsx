import Menu from "./components/Menu";
import Page from "./pages/Page";
import LoginPage from "./pages/LoginPage";
import AddInspirationPage from "./pages/AddInspirationPage";
import RegistrationPage from "./pages/RegistrationPage";
import FevoritePage from "./pages/FevoritePage";
import PostPage from "./pages/PostPage";
import ProfilPage from "./pages/ProfilePage";

import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/home" component={Page} exact />
            <Route path="/profile" component={ProfilPage} exact />
            <Route path="/post" component={PostPage} exact />
            <Route path="/favorite" component={FevoritePage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/register" component={RegistrationPage} exact />
            <Route
              path="/addInspiration"
              component={AddInspirationPage}
              exact
            />
            <Redirect from="/" to="/home" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
