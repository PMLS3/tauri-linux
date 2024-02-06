import  { useContext, useState, useEffect, useRef } from 'react';
import styles from './CheckoutPage.module.scss';
import PaymentView from '../../components/PaymentView/PaymentView';
import { money } from '../../utils/Money';
import WSClient from '../../utils/WSClient';
import { PaymentContext } from '../../contexts/PaymentContext';
import ProductDetail from '../../components/ProductDetail';
import useSwipeToRoute from '../../hooks/useSwipeToRoute.tsx';

function CheckoutPage() {
  const payment = useContext(PaymentContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const buttonRef = useRef(null);

    // Sends a cancel request
    function handleCancel(e: any) {
      e.preventDefault();
      setIsDisabled(true);
      setTimeout(async () => {
        handleButtonClick(); // Use the swipe-to-route logic
      }, 600);
    }

  const handleButtonClick = useSwipeToRoute(buttonRef, '/select_product'); // Adjust the route path accordingly

  useEffect(() => {
    const handleBackForward = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      setIsDisabled(true);
      WSClient.getInstance().cancel();
      if (document.getElementById('cancel-btn')) {
        document.getElementById('cancel-btn')?.classList.add('d-none');
      }

      setTimeout(() => {
        if (document.getElementById('cancel-btn')) {
          document.getElementById('cancel-btn')?.classList.remove('d-none');
        }
      }, 1000);

      handleCancel(event);
    };
 
    window.addEventListener('popstate', handleBackForward);

    document.title = `${payment.product.name} - £${money(payment.product.price)}`;
    setTimeout(() => {
      if (document.getElementById('cancel-btn')) {
        document.getElementById('cancel-btn')?.classList.remove('d-none');
      }
    }, 1000);

    return () => {
      window.removeEventListener('popstate', handleBackForward);
    };
  }, [payment.product]);



  return (
    <div className={styles.CheckoutPage}>
      <div className="container-fluid">
        <div className="row equal">
          <div className="col-6">
            <ProductDetail product={payment.product} cancelled={isDisabled} />
          </div>
          <div className="col-6 px-1">
            <PaymentView />
          </div>
        </div>

        <div className="page-navigator d-flex justify-content-between mt-3">
          <button
            id="cancel-btn"
            className="btn btn-danger btn-lg d-none"
            onClick={handleCancel}
            ref={buttonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
