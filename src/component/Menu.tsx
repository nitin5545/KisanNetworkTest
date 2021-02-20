import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

const Menu: React.FC = () => {
    const history = useHistory()
    return (
            <IonMenu side="start" menuId="first" contentId="main">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Kisan Network test</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem className="paddingStart pointer">
                            <IonLabel onClick={() => { history.push('/') }}>Contacts</IonLabel>
                        </IonItem>
                        <IonItem className="paddingStart pointer">
                            <IonLabel onClick={() => history.push('/sentMessages')}>Messages</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
    );
};

export default Menu
