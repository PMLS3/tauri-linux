import ReactDOM from 'react-dom';
import ErrorPage from './ErrorPage';

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: {
      title: "dummy Title",
      message: "dummy Message"
    }
  }),
  useNavigate: () => ({
    push: jest.fn(),
  }),
}));
it('Error Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});