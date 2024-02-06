import ReactDOM from "react-dom";
import DeclinedPage from "./DeclinedPage";

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

it("Declined Page should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DeclinedPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
