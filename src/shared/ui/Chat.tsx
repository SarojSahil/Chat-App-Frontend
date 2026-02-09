import { useAuth } from "@/app/context/authContext/AuthContext";
import { Client } from "@stomp/stompjs";
import { useEffect, useState, type SyntheticEvent } from "react";

const Chat = () => {

    const [client, setClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: `ws://${window.location.host}/ws`,
            onConnect: () => {
                stompClient.subscribe(`/queue/user/${user?.id}`, (msg) => {
                    setMessages(prev => ([...prev, msg.body]));
                })
            },
            debug: (msg) => console.log(msg)
        });
        stompClient.activate();
        setClient(stompClient);

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);

    const send = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message");
        const receiverId = formData.get("receiver");

        if (client) {
            client.publish({
                destination: "/app/send",
                body: JSON.stringify({
                    message,
                    receiverId,
                })
            });
        }
    }

    return (
        <div>
            <h1>Welcome to Chat App</h1>
            <form onSubmit={send}>
                <label htmlFor="message">Message: </label>
                <input type="text" name="message" id="message" className="border rounded mb-4" /><br />
                <label htmlFor="receiver">Receiver Id: </label>
                <input type="number" name="receiver" id="receiver" className="border rounded mb-4" /><br />
                <button type="submit" className="min-w-32 block mx-auto py-1 rounded bg-blue-500 text-white">Send</button>
            </form>
            <ul>
                {
                    messages.map(msg => <li key={msg}>{msg}</li>)
                }
            </ul>
        </div>
    );
}

export default Chat;