import ReactDOM from "react-dom";
import SuccessPage from "./SuccessPage";
jest.mock("react-router-dom", () => ({
  useNavigate: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    state: {
      title: "dummy Title",
      message: "dummy Message",
    },
  }),
}));

it("Success Page should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SuccessPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
