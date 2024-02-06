import ReactDOM from 'react-dom';
import CheckoutPage from './CheckoutPage';

it('Checkout Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CheckoutPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});