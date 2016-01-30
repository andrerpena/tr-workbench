import React from 'react';
import ReactDom from 'react-dom';
import App from './client/views/App';
import configureStore from './client/store/configureStore';
import { Provider } from 'react-redux';
import DevTools from './client/DevTools';

// styles
import fontAwesome from 'font-awesome/less/font-awesome.less';
import styles from './client/sass/styles.scss';
import sassTest from './client/sass/test.scss';

const store = configureStore();

ReactDom.render((
    <Provider store={store}>
        <div>
            <App />
            <DevTools />
        </div>
    </Provider>
), document.getElementById('#app_container'));