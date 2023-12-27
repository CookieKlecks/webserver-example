import {useEffect, useState} from "react";

export type useWebsocketProps = {
    url: string,
    onMessage?: (data: any) => void,
    onOpen?: () => void
}

export const useWebsocket = ({url, onMessage, onOpen}: useWebsocketProps) => {
    const [webSocket, setWebSocket] = useState<WebSocket>(new WebSocket(url))
    
    useEffect(() => {
        const handleOpen = () => {
            if (onOpen !== undefined) {
                onOpen()
            }
        }
        const handleMessage = (msg: MessageEvent<any>) => {
            if (onMessage !== undefined) {
                onMessage(msg.data)
            }
        }
        const handleClose = () => {
            setTimeout(() => {
                setWebSocket(new WebSocket(url))
            }, 500)
        }
        
        webSocket.addEventListener("open", handleOpen);
        webSocket.addEventListener('message', handleMessage)
        webSocket.addEventListener('close', handleClose)
        
        return () => {
            webSocket.removeEventListener("open", handleOpen)
            webSocket.removeEventListener("message", handleMessage)
            webSocket.removeEventListener("close", handleClose)
        }
    }, [onMessage, onOpen, url, webSocket])

    return webSocket
}