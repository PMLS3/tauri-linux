import { Routes,Route } from "react-router-dom";

import Header from "../components/Header";
import ProductSelectionPage from "../pages/ProductSelectionPage/ProductSelectionPage";
import TieredProductSelectionPage from "../pages/TieredProductSelectionPage/TieredProductSelectionPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import SuccessPage from "../pages/SuccessPage/SuccessPage";
import DeclinedPage from "../pages/DeclinedPage/DeclinedPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ActionRequiredPage from "../pages/ActionRequiredPage/ActionRequiredPage";
import ThankYouPage from "../pages/ThankYouPage/ThankYouPage";
import StatsPage from "../pages/StatsPage/StatsPage";
import DevicesPage from "../pages/DevicesPage/DevicesPage";
import PinPage from "../pages/PinPage/PinPage";
import KioskProvider from "../contexts/KioskContext";
import PaymentProvider from "../contexts/PaymentContext";
import DisclaimerPage from "../pages/DisclaimerPage/DisclaimerPage";
import SplashScreen from "../pages/SplashScreen/SplashScreen";
import PostPaymentInstructions from "../pages/PostPaymentInstruction/PostPaymentInstruction"
import config from "../App.config";
import DeviceConfigPage from "../pages/DeviceConfigPage/DeviceConfigPage";

function HeaderRoutes() {
  return (
    <>
      <Header />
      <div className="innerPane">
    <Routes>
        <Route
          path="/select_product"
          element={
            config.useTieredProductSelectionPage
              ? <TieredProductSelectionPage />
              : <ProductSelectionPage />
          }
        />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/declined" element={<DeclinedPage/>} />
        <Route path="/error" element={<ErrorPage/>} />
        <Route path="/action" element={<ActionRequiredPage/>} />
        <Route path="/thanks" element={<ThankYouPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/stats" element={<StatsPage/>} />
        <Route path="/devices" element={<DevicesPage/>} />
        <Route path="/pin" element={<PinPage/>} />
        <Route path="/deviceConfig" element={<DeviceConfigPage  />} />
      </Routes>
      </div>
    </>
  );
}

export default function RoutesApp() {

  
  return (
    <div className="App innerPane">
      
      <KioskProvider>
        <PaymentProvider>
        {/* <BrowserRouter> */}
    <Routes>
          <Route path="/" element={<SplashScreen/>} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/instructions" element={<PostPaymentInstructions />}/>
          <Route path="/*" element={<HeaderRoutes />} />
          {/* <Route
          path="/select_product"
          element={
            config.useTieredProductSelectionPage
              ? <TieredProductSelectionPage />
              : <ProductSelectionPage />
          }
        />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/declined" element={<DeclinedPage/>} />
        <Route path="/error" element={<ErrorPage/>} />
        <Route path="/action" element={<ActionRequiredPage/>} />
        <Route path="/thanks" element={<ThankYouPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/stats" element={<StatsPage/>} />
        <Route path="/devices" element={<DevicesPage/>} />
        <Route path="/pin" element={<PinPage/>} />
        <Route path="/deviceConfig" element={<DeviceConfigPage />} /> */}
            {/* <Route
              element={({ location }: { location: any }) => 
                ["/", "/disclaimer", "/instructions"].includes(location.pathname)
                  ? null
                  : HeaderRoutes()
              }
            /> */}
            {/* <Route
  element={({ location }: { location: any }) =>
    ["/", "/disclaimer", "/instructions"].includes(location.pathname) ? null : (
      <HeaderRoutes />
    )
  }
/> */}

             
        </Routes>
        {/* </BrowserRouter> */}
        </PaymentProvider>
      </KioskProvider>
    </div>
  );
}
