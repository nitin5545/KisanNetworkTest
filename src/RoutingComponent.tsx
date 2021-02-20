import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ContactDetails from './component/ContactDetails';
import ContactList from './component/ContactList';
import SendMessage from './component/SendMessage';
import SentMessages from './component/SentMessages';

const RoutingComponent = (props: any) => {
    return (
        <IonRouterOutlet className="mt_50">
            <Switch>
                <Route exact path="/" component={ContactList} />
                <Route exact path="/contactDetails/:contactId" component={ContactDetails} />
                <Route exact path="/sendMessage/:contactId" component={SendMessage} />
                <Route exact path="/messages" component={SentMessages} />
                <Redirect to="/" />
            </Switch>
        </IonRouterOutlet>
    )
};

export default RoutingComponent