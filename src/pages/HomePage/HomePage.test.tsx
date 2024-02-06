import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import {BrowserRouter as Router } from 'react-router-dom';

it('Home Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><HomePage /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});