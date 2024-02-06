import ReactDOM from 'react-dom';
import CheckAnimation from './CheckAnimation';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CheckAnimation />, div);
  ReactDOM.unmountComponentAtNode(div);
});