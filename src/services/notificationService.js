class NotificationService {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectTimeout = 3000;
        this.handlers = new Set();
    }

    connect() {
        const token = sessionStorage.getItem('tokenValue');
        // 替换为实际的 WebSocket 服务器地址
        this.ws = new WebSocket(`ws://your-api-domain/ws/notifications?token=${token}`);

        this.ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            this.handlers.forEach(handler => handler(notification));
        };

        this.ws.onclose = () => {
            this.handleDisconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    handleDisconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
                this.reconnectAttempts++;
                this.connect();
            }, this.reconnectTimeout);
        }
    }

    subscribe(handler) {
        this.handlers.add(handler);
        return () => this.handlers.delete(handler);
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export const notificationService = new NotificationService(); 