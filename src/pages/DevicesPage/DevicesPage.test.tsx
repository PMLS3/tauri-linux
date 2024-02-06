import ReactDOM from 'react-dom';
import DevicesPage from './DevicesPage';
import {BrowserRouter as Router } from 'react-router-dom';

it('Devices Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><DevicesPage /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});