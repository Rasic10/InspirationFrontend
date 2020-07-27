import * as React from "react";
import data from "./data/songs.json";
import "./SongCard.css";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
  IonAvatar,
  IonLabel,
  IonCardContent,
} from "@ionic/react";

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
}

const SongCard2: React.FC<{ songs: Song[]; songs1: Song }> = (props) => {
  return (
    <IonContent>
      {props.songs.map((data) => {
        return (
          <IonCard key={data.songID}>
            <IonCardHeader>
              <IonCardSubtitle>
                {/* <IonDatetime value={new Date().toDateString()}></IonDatetime> */}
              </IonCardSubtitle>
              <IonCardTitle>
                <IonItem>
                  <IonAvatar>
                    <img
                      src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                      alt="description"
                    />
                  </IonAvatar>
                  <IonLabel>
                    {data.user.firstName} {data.user.lastName}{" "}
                    {data.user.userName}
                  </IonLabel>
                </IonItem>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardTitle>{data.title}</IonCardTitle>
              {data.text}
              {console.log(data.text)}
              {/* {data.textSong.split("\n").map((i) => {
                  return <p>{i}</p>;
                })} */}
            </IonCardContent>
          </IonCard>
        );
      })}
    </IonContent>
  );
};

export default SongCard2;
