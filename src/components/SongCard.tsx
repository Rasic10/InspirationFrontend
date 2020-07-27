import * as React from "react";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonAvatar,
  IonTextarea,
} from "@ionic/react";
import data from "./data/songs.json";
import "./SongCard.css";

export interface SongCardProps {}

export interface SongCardState {}

class SongCard extends React.Component<SongCardProps, SongCardState> {
  constructor(props: SongCardProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IonContent>
        {data.map((data) => {
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
                      {data.user.firstName} {data.user.lastName}
                    </IonLabel>
                  </IonItem>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardTitle id="cardTitle">{data.nameSong}</IonCardTitle>
                <IonTextarea id="cardTextArea">{data.textSong}</IonTextarea>

                {/* {data.textSong.split("\n").map((i) => {
                  return <p>{i}</p>;
                })} */}
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    );
  }
}

export default SongCard;
