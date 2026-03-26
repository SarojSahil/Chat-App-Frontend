import type { LoginResponse, MessageRequest, MessageResponse, User } from "@/schema";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";

const Chat = () => {

    const queryClient = useQueryClient();
    const clientRef = useRef<Client>(null);
    const userRef = useRef<User>(null);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [receiverId, setReceiverId] = useState<number>(0);

    useEffect(() => {

        //Setting Token
        const loginData = queryClient.getMutationCache().find<LoginResponse>({ mutationKey: ["auth/login"], status: "success" });
        let token;
        if (loginData?.state.data) {
            token = loginData.state.data.token;
        }

        //Setting User
        const userData = queryClient.getQueryData<User>(["auth/me"]);
        if (userData) {
            userRef.current = userData;
        }

        //Setting Messages
        const messagesData = queryClient.getQueryData<MessageResponse[]>(["messages"]);
        if (messagesData) {
            setMessages(messagesData);
        }

        //Initializing Stomp Client
        const stompClient = new Client({
            brokerURL: `ws://localhost:8080/ws`,
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                stompClient.subscribe("/user/queue/messages", (message) => {
                    const newMessage: MessageResponse = JSON.parse(message.body);
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
        const form = event.currentTarget;
        const newMessage: MessageRequest = {
            message: form["message"].value,
            receiverId: parseInt(form["receiverId"].value),
        }

        if (clientRef.current) {
            clientRef.current.publish({
                destination: "/app/chat",
                body: JSON.stringify(newMessage),
            });
        }
    }

    const handleReceiverChange = (event: ChangeEvent<HTMLInputElement>) => {
        const receiver = parseInt(event.target.value);
        setReceiverId(receiver)
    }

    return (
        <div className="font-snpro">
            <h1>Welcome to Chat App</h1>
            <form onSubmit={send}>
                <label htmlFor="message">Message: </label>
                <input type="text" name="message" id="message" className="border rounded mb-4" /><br />
                <label htmlFor="receiverId">Receiver ID: </label>
                <input type="number" name="receiverId" id="receiverId" className="border rounded mb-4" value={receiverId} onChange={handleReceiverChange} /><br />
                <button type="submit" className="min-w-32 block mx-auto py-1 rounded bg-blue-500 text-white">Send</button>
            </form>
            <ul>
                {
                    messages
                        .filter((message) => (message.receiverId === receiverId || message.senderId === receiverId) && userRef.current?.id !== receiverId)
                        .map(
                            (message) => <li key={message.id} className={`w-40 max-w-160 mb-2 px-4 py-1.5 rounded-md ${userRef.current?.id === message.senderId ? "ml-auto bg-emerald-500" : "mr-auto bg-white"}`}>
                                {message.message}
                            </li>
                        )
                }
            </ul>
        </div>
    );
}

export default Chat;