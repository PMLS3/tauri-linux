import ReactDOM from 'react-dom';
import StatsPage from './StatsPage';
import {BrowserRouter as Router } from 'react-router-dom';

it('Stats Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><StatsPage /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});