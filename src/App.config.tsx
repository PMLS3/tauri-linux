const BaseUrl = import.meta.env.REACT_APP_KAGENT_URL || 'http://kiosk.local:8080';
const WebSocketUrl = import.meta.env.REACT_APP_WEBSOCKET_URL || 'ws://kiosk.local:8080/kiosk';
// const WebSocketUrl = import.meta.env.REACT_APP_WEBSOCKET_URL || 'ws://kiosk.local:8080/kiosk';

const useWebSocket = (import.meta.env.REACT_APP_USE_WEB_SOCKET || 'true') === 'true';

const useTieredProductSelectionPage = false

console.log("BaseUrl: " + BaseUrl);
console.log("WebSocketUrl: " + WebSocketUrl);
console.log("useWebSocket: " + useWebSocket);
console.log("useTieredProductSelectionPage: " + useTieredProductSelectionPage);
fetch(BaseUrl)
  .then(response => {
    if (response.ok) {
      console.log('Mock server is running');
    } else {
      console.log('Failed to connect to mock server');
    }
  })
  .catch(error => {
    console.log('Error while connecting to mock server: ', error);
  });
  
const config = {
  BaseUrl,
  WebSocketUrl,
  useTieredProductSelectionPage,
  useWebSocket,
}

export default config