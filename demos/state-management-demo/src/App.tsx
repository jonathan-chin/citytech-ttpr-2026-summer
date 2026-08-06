import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { flashOutline, layersOutline, warningOutline } from 'ionicons/icons';
import NoStatePage from './demos/no-state/NoStatePage';
import ContextPage from './demos/context/ContextPage';
import ZustandPage from './demos/zustand/ZustandPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/no-state" component={NoStatePage} />
          <Route exact path="/context" component={ContextPage} />
          <Route exact path="/zustand" component={ZustandPage} />
          <Route exact path="/">
            <Redirect to="/no-state" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="no-state" href="/no-state">
            <IonIcon icon={warningOutline} />
            <IonLabel>No State</IonLabel>
          </IonTabButton>
          <IonTabButton tab="context" href="/context">
            <IonIcon icon={layersOutline} />
            <IonLabel>Context</IonLabel>
          </IonTabButton>
          <IonTabButton tab="zustand" href="/zustand">
            <IonIcon icon={flashOutline} />
            <IonLabel>Zustand</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
