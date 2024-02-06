import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import WSClient from '../utils/WSClient';

import { getKioskInfo, getKioskData } from '../services/KioskInfo';
import KioskInfo from '../services/KioskInfo';
import { WSActionCommand } from '../utils/WSCommand'
import { Product } from '../models/Product'
import { chunkArray } from '../utils/Array';

/// Merchant info
const defaultCompany : KioskInfo = {
    name: '',
    primaryColor: '#FF4D00',
    perPage: 4
};

/// Payment workflow
const defaultStep = {
    error: 0,
    step: 'waitingForCard',
    message: 'Please, follow instructions on card reader.'
};


// Contexts
const KioskContext = createContext(defaultCompany);
const PaymentWorkflow = createContext(defaultStep);


type ProductPage = { products: Product[] };
const initialProductPages: ProductPage[] = [];
const initialDevicePages: ProductPage[] = [];
const ProductPagesContext = createContext(initialProductPages);
const DevicePagesContext = createContext(initialDevicePages);
const initialLoading: Boolean = true
const KioskLoadingContext = createContext(initialLoading);
function KioskProvider(props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) {
    const history = useNavigate();
    const [company, setCompany] = useState(defaultCompany);
    const [step, setStep] = useState(defaultStep);
    const [productPages, setProductPages] = useState(initialProductPages)
    const [devicePages, setDevicePages] = useState(initialDevicePages)
    const [loading, setLoading] = useState(initialLoading)


    const reloadCompany = useCallback(async () => {
        console.log("Reloading company...")
        const rsp = await getKioskInfo()
        setCompany(rsp)
        setStep(defaultStep)
    }, []);
    
    const reloadProducts = useCallback(async () => {
        console.log("Reloading products...")
        const rsp = await getKioskData()
        setProductPages(chunkArray(rsp.products, company.perPage).map(c => {
            return { products: c }
        }))

        setDevicePages(chunkArray(rsp.products.filter(product => product.device != null), company.perPage).map(c => {
            return { products: c }
        }))
    }, [company.perPage])

    const GetInfo = useCallback(async () => {
        console.log("[KioskContext] Reloading kiosk information...")
        reloadCompany()
            .catch((_reason) => {
                setTimeout(() => {window.location.replace(window.location.origin)}, 2000); 
            })
            .then(() => {

                setLoading(false)
                console.log('Company reloaded')
            });
        reloadProducts()
            .catch(console.error)
            .then(() => console.log('Products reloaded'));
    }, [reloadCompany, reloadProducts])

    function socketCallback(cmd: string, data: string) {
        console.log("KioskCommand." + cmd)

        switch (cmd) {
        case "coinIn":
            // history.push("/about")
            break;
        case "action":
            let action: WSActionCommand = JSON.parse(data);
            history("/action", { state: action});
            break;
        case "start":
            history("/");
            break;
        case "event":
            let event: WSActionCommand = JSON.parse(data);
            setStep({ error: 0, step: event.title || '', message: event.message })
            history("/checkout",  { state: event});
            break;
        case "approved":
            let approved: WSActionCommand = JSON.parse(data);
            history("/success",  { state:approved});
            break;
        case "declined":
            let declined: WSActionCommand = JSON.parse(data);
            history("/declined", { state: declined});
            break;
        case "error":
            let error: WSActionCommand = JSON.parse(data);
            console.log("Error: " + error.message)
            // history("/error",  { state: error}); 
            break;
        case "completed":
            history("/thanks", { state: { title: 'Thank you', message: 'We wish a wonderful day.' } });
            break;
        default:
            break;
        }
    }

    WSClient.setup(socketCallback)

    useEffect(() => {

        GetInfo()
        const intervalId = setInterval(() => {
            GetInfo()
          }, 10000);
      
      
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [GetInfo]);

    return (
        <KioskLoadingContext.Provider value={loading}>
            <KioskContext.Provider value={company}>
                <ProductPagesContext.Provider value={productPages}>
                    <DevicePagesContext.Provider value={devicePages}>
                        <PaymentWorkflow.Provider value={step}>
                            {props.children}
                        </PaymentWorkflow.Provider>
                    </DevicePagesContext.Provider>
                </ProductPagesContext.Provider>
            </KioskContext.Provider>
        </KioskLoadingContext.Provider>
    );
}

export default KioskProvider;
export { KioskContext, PaymentWorkflow, ProductPagesContext, DevicePagesContext, KioskLoadingContext };







