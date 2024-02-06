import ReactDOM from 'react-dom';
import ThankYouPage from './ThankYouPage';
jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: {
      title: "dummy Title",
      message: "dummy Message"
    }
  })
}));
it('Location Page should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThankYouPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});