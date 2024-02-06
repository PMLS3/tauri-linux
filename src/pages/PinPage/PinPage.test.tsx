import ReactDOM from 'react-dom';
import PinPage from './PinPage';

it('Pin Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PinPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});