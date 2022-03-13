import {AppRegistry} from 'react-native';
import App from './src/routes/auth.routes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
