import { Websocket, WebsocketBuilder, ConstantBackoff } from "websocket-ts";
import config from "../App.config";

import { WSCommand } from "./WSCommand";

type WebsocketCallback = (cmd: string, args: string) => void
interface IWSClient {
  pay(amount: number, currency: string, productID?: number): void;
  cancel(): void;
  redirectCallback?: WebsocketCallback;
}

class WSClient {
  static instance: IWSClient;
  ws: Websocket;

  static dummyWSClient: IWSClient = {
    pay(_amount: number, _currency: string, _productID?: number) {},
    cancel() {},
  };

  // didOpen?: () => void
  redirectCallback?: WebsocketCallback;

  private constructor() {
    this.ws = new WebsocketBuilder(config.WebSocketUrl)
      .onOpen(this.onConnection.bind(this))
      .onClose(this.onDisconnection.bind(this))
      .onError(this.onFailure.bind(this))
      .onMessage(this.onMessage.bind(this))
      .onRetry(this.onRetry.bind(this))
      .withBackoff(new ConstantBackoff(2000)) // 1000ms = 1s
      .build();
  }

  // Static methods

  public static getInstance(): IWSClient {
    if (config.useWebSocket) {
      if (!WSClient.instance) {
        WSClient.instance = new WSClient();
      }
      return WSClient.instance;
    }
    return WSClient.dummyWSClient;
  }

  public static setup(callback: WebsocketCallback): IWSClient {
    if (config.useWebSocket) {
      if (!WSClient.instance) {
        WSClient.instance = new WSClient();
      }
      WSClient.instance.redirectCallback = callback;
      return WSClient.instance;
    }
    return WSClient.dummyWSClient;
  }

  // Public

  public pay(amount: number, currency: string, productID?: number) {
    console.log("Sending pay request...");
    let data = JSON.stringify({
      amount: amount,
      currency: currency,
      productID: productID,
    });
    let command: WSCommand = { cmd: "pay", data: data };
    let content = JSON.stringify(command);
    this.ws.send(content);
  }

  public cancel() {
    console.log("Cancelling payment...");
    let command: WSCommand = { cmd: "cancel", data: "{}" };
    let content = JSON.stringify(command);
    this.ws.send(content);
    
  }

  // Private callbacks

  private start() {
    this.redirectCallback?.("start", "");
  }

  private failed() {
    this.redirectCallback?.(
      "error",
      JSON.stringify({
        title: "Socket Closed",
        message: "Connection with server has been closed.",
      })
    );
  }

  private onConnection(_instance: Websocket, _ev: Event) {
    console.log("WebSocket connected");
    alert("WebSocket connected");
    this.start.bind(this)
  }

  private onDisconnection(_instance: Websocket, _ev: CloseEvent) {
    this.failed();
  }

  private onFailure(_instance: Websocket, _ev: Event) {
    this.failed();
  }

  private onRetry(_instance: Websocket, _ev: Event) {
    console.log("retrying...");
    alert("retrying...");
    this.failed();
  }

  private onMessage(_instance: Websocket, ev: MessageEvent) {
    console.log("✉️️ => " + ev.data);
    let obj: WSCommand = JSON.parse(ev.data);
    this.redirectCallback?.(obj.cmd, obj.data);
  }
}

export default WSClient;
