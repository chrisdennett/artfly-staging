import ReactDom from 'react-dom';
import routes from './routes';

import './style.css';

const app = document.getElementById('root');

ReactDom.render(
    routes,
    app
);
