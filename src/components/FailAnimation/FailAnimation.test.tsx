import ReactDOM from 'react-dom';
import FailAnimation from './FailAnimation';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FailAnimation />, div);
  ReactDOM.unmountComponentAtNode(div);
});