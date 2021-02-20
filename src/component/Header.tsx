import { IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface P {
    title: string
    showBack?: boolean
}
const Header: React.FC<P> = (props) => {
    const history = useHistory()
    const handleBack = () => {
        history.goBack()
    }
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    {props.showBack ? <IonIcon icon={arrowBackOutline} className="backIcon" onClick={handleBack} /> : <IonMenuButton></IonMenuButton>}
                </IonButtons>
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header