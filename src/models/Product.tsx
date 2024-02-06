
interface Device {
  mac: string;
  signal: number;
  type: string;
  ver: string;
  coinMeter: number;
  cashFloat: number;
  cashFloatReset: string;
  pulses: number;
  numberOfCardTransactions: number;
  lifetimeCash: number;
  lifetimeCard: number;
  cardSinceReset: number;
};
export class Product {
    id: number = 0
    name: string = "Unknown product";
    desc: string = "";
    image: string = "";
    price: number = 0;
    path: string = "/";
    tags: string[] = [];
    unavailable: boolean = true;
    device?: Device;

    constructor(name: string, desc: string, image: string, price: number, path: string, tags: string[], unavailable: boolean = false, device?: Device) {
      this.name = name;
      this.desc = desc
      this.image = image
      this.price = price
      this.path = path;
      this.tags = tags;
      this.unavailable = unavailable;
      this.device = device;
    }

}

export default Product;

