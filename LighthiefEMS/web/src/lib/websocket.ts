/**
 * WebSocket client for real-time data streaming.
 *
 * Connects to the FastAPI WebSocket endpoints for live
 * measurement and alarm data.
 */

type MessageHandler = (data: any) => void;

export class LiveDataStream {
  private ws: WebSocket | null = null;
  private url: string;
  private handlers: Map<string, MessageHandler[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;

  constructor(siteId: string) {
    const wsBase = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
    this.url = `${wsBase}/api/v1/telemetry/${siteId}/live`;
  }

  connect(): void {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log(`[WS] Connected to ${this.url}`);
        this.reconnectAttempts = 0;
        this.emit("connected", {});
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit("measurement", data);
        } catch {
          console.warn("[WS] Invalid message:", event.data);
        }
      };

      this.ws.onclose = (event) => {
        console.log(`[WS] Disconnected: ${event.code}`);
        this.emit("disconnected", { code: event.code });
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("[WS] Error:", error);
        this.emit("error", { error });
      };
    } catch (error) {
      console.error("[WS] Connection failed:", error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      console.log(
        `[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`
      );
      setTimeout(() => this.connect(), delay);
    }
  }

  on(event: string, handler: MessageHandler): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  off(event: string, handler: MessageHandler): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);
    }
  }

  private emit(event: string, data: any): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach((h) => h(data));
    }
  }

  disconnect(): void {
    this.maxReconnectAttempts = 0; // Prevent reconnection
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export class AlarmStream {
  private ws: WebSocket | null = null;
  private handlers: MessageHandler[] = [];

  connect(): void {
    const wsBase = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
    const url = `${wsBase}/api/v1/telemetry/alarms/live`;

    this.ws = new WebSocket(url);

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handlers.forEach((h) => h(data));
      } catch {
        console.warn("[AlarmWS] Invalid message");
      }
    };
  }

  onAlarm(handler: MessageHandler): void {
    this.handlers.push(handler);
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
