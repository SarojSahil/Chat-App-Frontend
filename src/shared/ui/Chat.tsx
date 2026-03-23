import type { LoginResponse, Message, User } from "@/schema";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";

const Chat = () => {

    const queryClient = useQueryClient();
    const clientRef = useRef<Client>(null);
    const userRef = useRef<User>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {

        //Setting Token
        const loginData = queryClient.getMutationCache().find<LoginResponse>({ mutationKey: ["auth/login"] });
        let token;
        if (loginData?.state.data) {
            token = loginData.state.data.token;
        }

        //Setting User
        const userData = queryClient.getQueryData<User>(["auth/me"]);
        if (userData) {
            userRef.current = userData;
        }

        //Initializing Stomp Client
        const stompClient = new Client({
            brokerURL: `ws://localhost:8080/ws`,
            debug: (msg) => console.log(msg),
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                stompClient.subscribe("/user/queue/messages", (message) => {
                    const newMessage: Message = JSON.parse(message.body);
                    setMessages(prev => [...prev, newMessage]);
                })
            }
        });
        clientRef.current = stompClient;
        stompClient.activate();

        return () => {
            if (clientRef.current != null) {
                clientRef.current.deactivate();
            }
        };
    }, []);

    const send = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newMessage: Message = {
            message: formData.get("message") as string,
            receiver: formData.get("receiver") as string,
            id: Date.now(),
            sender: userRef.current?.username || "unknown"
        }

        if (clientRef.current) {
            clientRef.current.publish({
                destination: "/app/chat",
                body: JSON.stringify(newMessage),
            });

            setMessages((prev) => [...prev, newMessage]);
        }
    }

    return (
        <div className="font-snpro">
            <h1>Welcome to Chat App</h1>
            <form onSubmit={send}>
                <label htmlFor="message">Message: </label>
                <input type="text" name="message" id="message" className="border rounded mb-4" /><br />
                <label htmlFor="receiver">Receiver: </label>
                <input type="text" name="receiver" id="receiver" className="border rounded mb-4" /><br />
                <button type="submit" className="min-w-32 block mx-auto py-1 rounded bg-blue-500 text-white">Send</button>
            </form>
            <ul>
                {
                    messages.map(message =>
                        <li key={message.id} className={`w-40 max-w-160 mb-2 px-4 py-1.5 rounded-md ${userRef.current?.username === message.sender ? "ml-auto bg-emerald-500" : "mr-auto bg-white" }`}>
                            {message.message}
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Chat;