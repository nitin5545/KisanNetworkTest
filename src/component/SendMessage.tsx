import { IonButton, IonContent, IonGrid, IonRow, IonTextarea } from '@ionic/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Contact } from './ContactList'
import Header from './Header'


const SendMessage: React.FC = () => {
    const [contactDetails, setContactDetails] = useState<Contact>()
    const [message, setMessage] = useState<number>(100000 + Math.floor(Math.random() * 900000))
    let { contactId } = useParams<{ contactId: string }>()
    useEffect(() => {
        fetch('/contacts.json').then(res => res.json()).then(data => {
            if (!isNaN(parseInt(contactId)) && parseInt(contactId) < data.length)
                setContactDetails(data[contactId])
        })
    }, [])

    const handleSendMessage = () => {
        if (contactDetails)
            axios.post("http://localhost:5000/sendMessage",
                {
                    message: message,
                    phoneNumber: contactDetails?.phoneNumber,
                    name: contactDetails?.firstName + " " + contactDetails?.lastName
                }).then((res) => {

                })
                .catch((error) => {

                })

    }


    return (
        <>
            <Header title="Contacts Details" showBack={true} />
            <IonContent>
                <IonGrid className="mx_10 contactDetailGrid">
                    <IonRow className="w_100 mb_16">
                        <IonTextarea
                            disabled
                            value={`Hi. Your OTP is: ${message}`}
                            className="border" />
                    </IonRow>
                    <IonRow className="w_100">
                        <IonButton expand="full" onClick={handleSendMessage} className="pointer w_100">Send Message</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default SendMessage