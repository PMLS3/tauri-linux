import { useContext } from 'react';
import styles from './PaymentView.module.scss';
import { PaymentWorkflow } from '../../contexts/KioskContext';

function PaymentView() {
  const workflow = useContext(PaymentWorkflow)

  return (
    <div className={styles.PaymentView}>
      <div className="card content-view shadow-sm clearfix">
        <div className="card-body d-flex flex-column">
          <div className="text-center m-auto w-75">
            <img src="https://www.kashing.co.uk/assets/products/kurvey-front-786021cf991ecbfa2f618867ccbb923d3c67e6ff0937485ea04ac8817c4627aa.png" 
                 alt="Kashing Card Reader" className="mb-4" style={{ width: 80 }}/>
            <h3 className="mb-0 text-uppercase">{ workflow.message }</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentView;
