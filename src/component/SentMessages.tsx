import { IonAvatar, IonContent, IonGrid, IonItem, IonLabel, IonList, IonText } from '@ionic/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './Header'

interface P {

}
export interface Message {
    name: string,
    otp: number,
    time: string
}
const SentMessages: React.FC<P> = (props) => {
    const [messageList, setMessageList] = useState<Message[]>([])
    useEffect(() => {
        axios.get("http://localhost:5000/message")
            .then((res) => {
                console.log(res.data)
                setMessageList(res.data.data)
            })
            .catch((error) => {

            })
    }, [])

    return (
        <>
            <Header title="Sent Messages" />
            <IonContent>
                <IonGrid className="mx_10">
                    <IonList>
                        {messageList.length > 0 ? messageList.map((message, index) => {
                            const [firstName, lastName] = message.name.split(' ')
                            return (
                                <IonItem key={index} className="listItem">
                                    <IonAvatar className="avatar mr_8">{firstName[0] + lastName[0]} </IonAvatar>
                                    <IonLabel>
                                        <IonText>{firstName} {lastName.toLowerCase()}</IonText>
                                        
                                        <p>{`Hi. Your OTP is: ${message.otp}`} </p>
                                    </IonLabel>
                                    <IonText className="messageDate">{new Date(message.time).toDateString()}</IonText>
                                </IonItem>
                            )
                        }): <IonText className="noMessages"> No Messages Sent</IonText>}
                    </IonList>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default SentMessages