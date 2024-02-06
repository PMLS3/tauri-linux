import config from '../App.config'
import { Product } from '../models/Product'
import KioskStats from '../models/KioskStats'

/// JSON response
interface KioskInfo {
  name: string
  logo?: string
  splash?: string
  disclaimer?: string
  disableProductSelectionPage?: boolean
  instructions?: string
  instructionsDuration?: number
  primaryColor: string
  perPage: number
}

interface KioskData {
  version: string
  products: Product[]
}

interface PinResponse {
  valid?: boolean
  error?: boolean
}

const defaultHeaders = { 'Content-Type': 'application/json' }

const getKioskInfo = () =>
  fetch(`${config.BaseUrl}/v1/kiosk/info`, {
    method: 'GET', mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(rsp => rsp.text())
    .then(body => {
      let data: KioskInfo = JSON.parse(body)
      console.log(data)
      return data
    })

const getKioskData = () =>
  fetch(`${config.BaseUrl}/v1/kiosk/data`, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(rsp => rsp.text())
    .then(body => { 
        let data: KioskData = JSON.parse(body)
        console.log('Version: ' + data.version)
        console.log('Products: ' + data.products.length)
        console.log('Product: ' + data.products)
        // for (var prod in data.products)
        // {
        //   if (prod. != null)
        //   {
        //     console.log('Devices: '+ prod.device)
        //   }
        // }  
        return data
    });

async function getKioskStats(opt: string): Promise<KioskStats> {
  const url = `${config.BaseUrl}/v1/kiosk/stats?option=${opt}`
  const response = await fetch(url, {
    method: 'GET', mode: 'cors',
    headers: defaultHeaders
  })
  return await response.json()
}

async function validatePin(pin: string): Promise<PinResponse> {
  const url = `${config.BaseUrl}/v1/kiosk/auth`
  const response = await fetch(url, {
    method: 'POST', mode: 'cors',
    headers: defaultHeaders,
    body: JSON.stringify({ 'pin': pin })
  })
  return await response.json()
}

export default KioskInfo;
export {
  getKioskInfo,
  getKioskData,
  getKioskStats,
  validatePin
};
