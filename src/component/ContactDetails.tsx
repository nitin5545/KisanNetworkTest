import { IonAvatar, IonButton, IonContent, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Contact } from './ContactList'
import {callOutline} from 'ionicons/icons'
import Header from './Header'



const ContactDetails: React.FC = () => {
    const [contactDetails, setContactDetails] = useState<Contact>()
    let { contactId } = useParams<{ contactId: string }>()
    useEffect(() => {
        fetch('/contacts.json').then(res => res.json()).then(data => {
            if (!isNaN(parseInt(contactId)) && parseInt(contactId) < data.length) {
                setContactDetails(data[contactId])
            }
        })
    }, [])
    const history = useHistory()
    return (
        <>
            <Header title="Contacts Details" showBack={true} />
            <IonContent>
                <IonGrid className="mx_10 contactDetailGrid">
                    <IonRow className="w_100 align-items mb_16">
                        <IonAvatar className="avatar mr_8">{contactDetails && contactDetails.firstName[0] + contactDetails.lastName[0]} </IonAvatar>
                        <IonText className="f18_l20">{contactDetails?.firstName} {contactDetails?.lastName}</IonText>
                    </IonRow>
                    <IonRow className="w_100 align-items mb_16">
                        <IonIcon icon={callOutline} size="large" className="mr_22" />
                        <IonText className="f18_l20">{contactDetails?.phoneNumber}</IonText>
                    </IonRow>
                    <IonRow className="w_100">
                        <IonButton expand="full" onClick={() => history.push(`/sendMessage/${contactId}`)} className="pointer w_100">Send Message</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default ContactDetails