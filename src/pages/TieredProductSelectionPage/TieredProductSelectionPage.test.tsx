import ReactDOM from 'react-dom';
import TieredProductSelectionPage from './TieredProductSelectionPage';

it('Product Selection Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TieredProductSelectionPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});