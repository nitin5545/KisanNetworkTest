import { IonAvatar, IonContent, IonGrid, IonItem, IonLabel, IonList } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'

interface P {

}
export interface Contact {
    firstName: string
    lastName: string
    phoneNumber: string
}
const ContactList: React.FC<P> = (props) => {
    const [contactList, setContactList] = useState<Contact[]>([])
    useEffect(() => {
        fetch('/contacts.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json()).then(data => setContactList(data))
    }, [])
    return (
        <>
            <Header title="Contacts" />
            <IonContent>
                <IonGrid className="mx_10">
                    <IonList>
                        {contactList.map((contact, index) => {
                            return <IonItem href={`/contactDetails/${index}`} key={index} className="listItem">
                                <IonAvatar className="avatar mr_8">{contact.firstName[0] + contact.lastName[0]} </IonAvatar>
                                <IonLabel>{contact.firstName} {contact.lastName.toLowerCase()}</IonLabel>
                            </IonItem>
                        })}
                    </IonList>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default ContactList