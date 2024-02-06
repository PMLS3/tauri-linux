import ReactDOM from 'react-dom';
import {  BrowserRouter as Router } from 'react-router-dom';
import AboutPage from './AboutPage';

it('About page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AboutPage /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});