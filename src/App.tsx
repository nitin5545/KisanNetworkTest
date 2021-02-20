import { IonApp, IonPage, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import './App.css';
import Menu from './component/Menu';
import RoutingComponent from './RoutingComponent';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonPage id="main">
            <RoutingComponent />
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
