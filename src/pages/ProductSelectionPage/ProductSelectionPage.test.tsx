import ReactDOM from 'react-dom';
import ProductSelectionPage from './ProductSelectionPage';

it('Product Selection Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductSelectionPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});