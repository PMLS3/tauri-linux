import React, { createContext,  useState,} from 'react';
import Product from '../models/Product';

// Empty product
const initialProduct = new Product("Product", "Description for the product", "", 0, "", [], true)
const initialValues = { 
  product: initialProduct,
  step: 'waitingForCard',
  message: 'Please, follow instructions on card reader.'
}
const PaymentContext = createContext(initialValues);

function PaymentProvider(props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) {
	const [context] = useState(initialValues)

	return (
		<PaymentContext.Provider value={ context }>
			{props.children}
		</PaymentContext.Provider>
	);
}

export default PaymentProvider;
export { PaymentContext };







