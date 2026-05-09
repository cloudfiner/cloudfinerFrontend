


// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import { getAccessToken } from "@/lib/authService";

// let stompClient = null;
// let reconnectTimeout = null;
// let isConnecting = false;
// let reconnectDelay = 3000;
// let retryCount = 0;
// let currentOnMessage = null;

// const TAB_ID = Date.now() + "_" + Math.random();


// let heartbeatInterval = null;

// /* ---------------- BACKEND HEALTH CHECK ---------------- */
// const BASE_URL = import.meta.env.VITE_API_URL;
// const WS_URL = import.meta.env.VITE_WS_URL;

// const isBackendAlive = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/actuator/health`);
//     return res.ok;
//   } catch {
//     return false;
//   }
// };

// /* ---------------- HEARTBEAT ---------------- */
// const startHeartbeat = () => {
//   stopHeartbeat();

//   heartbeatInterval = setInterval(() => {
//     if (stompClient && stompClient.connected) {
//       try {
//         stompClient.send("/app/ping", {}, "ping");
//       } catch {}
//     }
//   }, 10000);
// };

// const stopHeartbeat = () => {
//   if (heartbeatInterval) {
//     clearInterval(heartbeatInterval);
//     heartbeatInterval = null;
//   }
// };

// /* ---------------- TAB CONTROL ---------------- */
// const isActiveTab = () => {
//   return localStorage.getItem("WS_ACTIVE_TAB") === TAB_ID;
// };

// const acquireTabLock = () => {
//   if (!localStorage.getItem("WS_ACTIVE_TAB")) {
//     localStorage.setItem("WS_ACTIVE_TAB", TAB_ID);
//   }
// };

// /* ---------------- CONNECT ---------------- */
// export const connectWebSocket = async (onMessage) => {
//   const token = getAccessToken();

//   if (!token) {
//     console.log("No token → skipping WS");
//     return;
//   }

//   acquireTabLock();

//   if (!isActiveTab()) {
//     console.log("Not active tab → skipping WS");
//     return;
//   }

//   if (stompClient?.connected || isConnecting) {
//     console.log("Already connected or connecting...");
//     return;
//   }

//   if (!(await isBackendAlive())) {
//     console.log("Backend not ready → skip WS");
//     return;
//   }

//   currentOnMessage = onMessage;
//   isConnecting = true;

//   const socket = new SockJS(WS_URL);
//   const client = Stomp.over(socket);

//   // Reduce noise in production
//   client.debug = () => {};

//   stompClient = client;

//   client.connect(
//     { Authorization: `Bearer ${token}` },

//     (frame) => {
//       console.log("WebSocket Connected");

//       isConnecting = false;
//       retryCount = 0;
//       reconnectDelay = 3000;

//       if (reconnectTimeout) {
//         clearTimeout(reconnectTimeout);
//         reconnectTimeout = null;
//       }

//       localStorage.setItem("WS_ACTIVE_TAB", TAB_ID);

//       client.subscribe("/user/queue/alerts", (msg) => {
//         if (msg.body && currentOnMessage) {
//           const data = JSON.parse(msg.body);
//           currentOnMessage(data);
//         }
//       });

//       startHeartbeat();
//     },

//     async (error) => {
//       console.log("WebSocket ERROR:", error?.message || error);

//       isConnecting = false;
//       stopHeartbeat();

//       const token = getAccessToken();
//       if (!token) return;

//       if (retryCount >= 10) {
//         console.log("Max retries reached → stopping reconnect");
//         return;
//       }

//       if (!(await isBackendAlive())) {
//         console.log("Backend still down → skip reconnect");
//         return;
//       }

//       retryCount++;

//       reconnectTimeout = setTimeout(() => {
//         connectWebSocket(currentOnMessage);
//       }, reconnectDelay);

//       reconnectDelay = Math.min(reconnectDelay + 2000, 30000);
//     }
//   );
// };

// /* ---------------- DISCONNECT ---------------- */
// export const disconnectWebSocket = () => {
//   try {
//     if (stompClient?.connected) {
//       stompClient.disconnect(() => {
//         console.log("WebSocket Disconnected");
//       });
//     }
//   } catch {}

//   stompClient = null;
//   isConnecting = false;

//   stopHeartbeat();

//   if (reconnectTimeout) {
//     clearTimeout(reconnectTimeout);
//     reconnectTimeout = null;
//   }

//   if (isActiveTab()) {
//     localStorage.removeItem("WS_ACTIVE_TAB");
//   }
// };

// /* ---------------- MULTI TAB SYNC ---------------- */
// if (!window.__WS_LISTENER__) {
//   window.__WS_LISTENER__ = true;

//   window.addEventListener("storage", (event) => {
//     if (event.key === "WS_ACTIVE_TAB") {
//       if (!isActiveTab() && stompClient?.connected) {
//         disconnectWebSocket();
//       }

//       if (isActiveTab() && !stompClient && currentOnMessage) {
//         setTimeout(() => connectWebSocket(currentOnMessage), 1000);
//       }
//     }
//   });
// }

// /* ---------------- CLEANUP ---------------- */
// window.addEventListener("beforeunload", () => {
//   if (isActiveTab()) {
//     localStorage.removeItem("WS_ACTIVE_TAB");
//   }
// });




import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getAccessToken } from "@/lib/authService";

let stompClient = null;
let reconnectTimeout = null;
let isConnecting = false;
let reconnectDelay = 3000;
let retryCount = 0;
let currentOnMessage = null;

const TAB_ID = Date.now() + "_" + Math.random();

let heartbeatInterval = null;

/* ---------------- ENV ---------------- */
const BASE_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

/* ---------------- BACKEND HEALTH CHECK ---------------- */
const isBackendAlive = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${BASE_URL}/actuator/health`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
};

/* ---------------- HEARTBEAT ---------------- */
const startHeartbeat = () => {
  stopHeartbeat();

  heartbeatInterval = setInterval(() => {
    if (stompClient?.connected) {
      try {
        stompClient.send("/app/ping", {}, "ping");
      } catch {}
    }
  }, 10000);
};

const stopHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};

/* ---------------- TAB CONTROL ---------------- */
const isActiveTab = () => {
  return localStorage.getItem("WS_ACTIVE_TAB") === TAB_ID;
};

const acquireTabLock = () => {
  if (!localStorage.getItem("WS_ACTIVE_TAB")) {
    localStorage.setItem("WS_ACTIVE_TAB", TAB_ID);
  }
};

/* ---------------- CONNECT ---------------- */
export const connectWebSocket = async (onMessage) => {
  const token = getAccessToken();

  if (!token) {
    console.log("No token → skipping WS");
    return;
  }

  acquireTabLock();

  if (!isActiveTab()) {
    console.log("Not active tab → skipping WS");
    return;
  }

  if (stompClient?.connected || isConnecting) {
    console.log("Already connected or connecting...");
    return;
  }

  if (!(await isBackendAlive())) {
    console.log("Backend not ready → skip WS");
    return;
  }

  currentOnMessage = onMessage;
  isConnecting = true;

  const socket = new SockJS(WS_URL);
  const client = Stomp.over(socket);

  // Silent in production
  client.debug = () => {};

  stompClient = client;

  client.connect(
    { Authorization: `Bearer ${token}` },

    // ✅ ON CONNECT
    (frame) => {
      console.log("WebSocket Connected");

      isConnecting = false;
      retryCount = 0;
      reconnectDelay = 3000;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }

      localStorage.setItem("WS_ACTIVE_TAB", TAB_ID);

      client.subscribe("/user/queue/alerts", (msg) => {
        if (msg.body && currentOnMessage) {
          try {
            const data = JSON.parse(msg.body);
            currentOnMessage(data);
          } catch (e) {
            console.error("WS message parse failed:", e.message);
          }
        }
      });

      startHeartbeat();
    },

    // ✅ ON ERROR
    async (error) => {
      console.log("WebSocket ERROR:", error?.message || error);

      isConnecting = false;
      stopHeartbeat();

      const token = getAccessToken();
      if (!token) {
        console.log("No token → stop reconnect");
        return;
      }

      if (retryCount >= 10) {
        console.log("Max retries reached → stopping reconnect");
        return;
      }

      if (!(await isBackendAlive())) {
        console.log("Backend still down → skip reconnect");
        return;
      }

      retryCount++;
      console.log(`Reconnecting... attempt ${retryCount} in ${reconnectDelay}ms`);

      reconnectTimeout = setTimeout(() => {
        connectWebSocket(currentOnMessage);
      }, reconnectDelay);

      reconnectDelay = Math.min(reconnectDelay + 2000, 30000);
    }
  );
};

/* ---------------- DISCONNECT ---------------- */
export const disconnectWebSocket = () => {
  try {
    if (stompClient?.connected) {
      stompClient.disconnect(() => {
        console.log("WebSocket Disconnected");
      });
    }
  } catch {}

  stompClient = null;
  isConnecting = false;

  stopHeartbeat();

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  if (isActiveTab()) {
    localStorage.removeItem("WS_ACTIVE_TAB");
  }
};

/* ---------------- MULTI TAB SYNC ---------------- */
if (!window.__WS_LISTENER__) {
  window.__WS_LISTENER__ = true;

  window.addEventListener("storage", (event) => {
    if (event.key === "WS_ACTIVE_TAB") {
      if (!isActiveTab() && stompClient?.connected) {
        disconnectWebSocket();
      }

      if (isActiveTab() && !stompClient && currentOnMessage) {
        setTimeout(() => connectWebSocket(currentOnMessage), 1000);
      }
    }
  });
}

/* ---------------- CLEANUP ---------------- */
window.addEventListener("beforeunload", () => {
  if (isActiveTab()) {
    localStorage.removeItem("WS_ACTIVE_TAB");
  }
});