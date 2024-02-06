import ReactDOM from 'react-dom';
import PaymentView from './PaymentView';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PaymentView />, div);
  ReactDOM.unmountComponentAtNode(div);
});