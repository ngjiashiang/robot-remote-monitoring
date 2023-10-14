import { useState, useEffect } from "react";
import Echo from 'laravel-echo';
import Pusher from "pusher-js"

const useWebSockets = () => {
    window.Pusher = Pusher;
    window.Echo = new Echo({
        broadcaster: "pusher",
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        wsHost: import.meta.env.VITE_PUSHER_HOST,
        wsPort: import.meta.env.VITE_PUSHER_PORT,
        wssPort: import.meta.env.VITE_PUSHER_PORT,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: false,
        encrypted: true,
        disableStats: true,
        enabledTransports: ["ws", "wss"],
    });
}

export const usePublicChannel = (channelName, eventName) => {
    const [publicChannelData, setPublicChannelData] = useState();
    useWebSockets();
    useEffect(() => {
        window.Echo.channel(channelName).listen(eventName, (e) => {
            setPublicChannelData(e);
        });
    }, []);

    return publicChannelData;
};

export const usePrivateChannel = (channelName, eventName) => {
    const [privateChannelData, setPrivateChannelData] = useState();
    useWebSockets();
    useEffect(() => {
        window.Echo.private(channelName).listen(eventName, (e) => {
            setPrivateChannelData(e);
        });
    }, []);

    return privateChannelData;
};

export const isConnected = () => {
    const [isConnected, setIsConnected] = useState(true);

    window.Echo.connector.pusher.connection.bind('disconnected', () => {
        setIsConnected(false);
    });

    window.Echo.connector.pusher.connection.bind('unavailable', () => {
        setIsConnected(false);
    });

    window.Echo.connector.pusher.connection.bind('failed', () => {
        setIsConnected(false);
    });

    window.Echo.connector.pusher.connection.bind('disconnected', () => {
        setIsConnected(false);
    });

    return isConnected;
}