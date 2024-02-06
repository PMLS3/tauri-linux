import ReactDOM from 'react-dom';
import ActionRequiredPage from './ActionRequiredPage';

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: {
      title: "dummy Title",
      message: "dummy Message"
    }
  })
}));

it('ActionRequiredPage should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActionRequiredPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
