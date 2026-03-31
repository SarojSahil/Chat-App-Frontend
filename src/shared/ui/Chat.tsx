import type { ChatRequest, LoginResponse, Message, MessageReadRequest, MessageStatusRequest, MessageStatusResponse, User } from "@/schema";
import { Client } from "@stomp/stompjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";

const Chat = () => {

    const queryClient = useQueryClient();
    const clientRef = useRef<Client>(null);
    const userRef = useRef<User>(null);
    const tokenRef = useRef<string>(null);

    const [messages, setMessages] = useState<Message[]>([]);

    const [otherPerson, setOtherPerson] = useState<number>(0);
    const otherPersonRef = useRef<number>(otherPerson);

    const { mutate: readMessages } = useMutation<undefined, Error, MessageReadRequest>({
        mutationKey: ["messages/read"],
        mutationFn: async (payload) => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/read`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenRef.current}`
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error("Response Not Ok!");
            }
        }
    });

    useEffect(() => {

        //Setting Token
        const loginData = queryClient.getMutationCache().find<LoginResponse>({ mutationKey: ["auth/login"], status: "success" });
        if (loginData?.state.data) {
            tokenRef.current = loginData.state.data.token;
        }

        //Setting User
        const userData = queryClient.getQueryData<User>(["auth/me"]);
        if (userData) {
            userRef.current = userData;
        }

        //Setting Messages
        const messagesData = queryClient.getQueryData<Message[]>(["messages"]);
        if (messagesData) {
            setMessages(messagesData);
        }

        //Initializing Stomp Client
        const stompClient = new Client({
            brokerURL: `ws://localhost:8080/ws`,
            connectHeaders: {
                Authorization: `Bearer ${tokenRef.current}`
            },
            onConnect: () => {
                stompClient.subscribe("/user/queue/message", (message) => {
                    const newMessage: Message = JSON.parse(message.body);

                    setMessages(prev => [...prev, newMessage]);

                    if (newMessage.receiverId === userRef.current?.id) {

                        let messageStatusRequest: MessageStatusRequest = {
                                messageId: newMessage.id,
                                status: (otherPersonRef.current === newMessage.senderId) ? "READ" : "DELIVERED"
                            }

                        stompClient.publish({
                            destination: "/app/message/status",
                            body: JSON.stringify(messageStatusRequest)
                        });
                    }
                });
                stompClient.subscribe("/user/queue/message/status", (message) => {
                    const statusUpdates: MessageStatusResponse[] = JSON.parse(message.body);
                    setMessages(prev =>
                        prev.map(msg => {
                            const updatedMessage = statusUpdates.find(update => update.messageId === msg.id);
                            if (updatedMessage) {
                                msg.status = updatedMessage.status;
                            }
                            return msg;
                        })
                    );
                });
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

    useEffect(() => {
        (otherPerson && otherPerson !== userRef.current?.id) && readMessages({ senderId: otherPerson });
        otherPersonRef.current = otherPerson;
    }, [otherPerson]);

    const send = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const newMessage: ChatRequest = {
            message: form["message"].value,
            receiverId: parseInt(form["receiverId"].value),
        }

        if (clientRef.current) {
            clientRef.current.publish({
                destination: "/app/message",
                body: JSON.stringify(newMessage),
            });
        }
    }

    const getFormattedTime = (timestamp: string): string => {
        const date = new Date(timestamp);
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: "2-digit",
            minute: "2-digit",
        })
        return formatter.format(date);
    }

    return (
        <div className="font-snpro">
            <h1>Welcome to Chat App</h1>
            <form onSubmit={send}>
                <label htmlFor="message">Message: </label>
                <input type="text" name="message" id="message" className="border rounded mb-4" /><br />
                <label htmlFor="receiverId">Receiver ID: </label>
                <input type="number" name="receiverId" id="receiverId" className="border rounded mb-4" value={otherPerson} onChange={e => setOtherPerson(parseInt(e.target.value))} /><br />
                <button type="submit" className="min-w-32 block mx-auto py-1 rounded bg-blue-500 text-white">Send</button>
            </form>
            <ul>
                {
                    messages
                        .filter((message) => (message.receiverId === otherPerson || message.senderId === otherPerson) && userRef.current?.id !== otherPerson)
                        .map(
                            (message) => {
                                return (
                                    <li
                                        key={message.id}
                                        className={`max-w-120 mb-2 px-4 py-1.5 rounded-md ${userRef.current?.id === message.senderId ? "ml-auto bg-[#9edd9e]" : "mr-auto bg-white"}`}>
                                        <div>
                                            {message.message}
                                        </div>
                                        <div className="text-sm font-bold flex justify-end gap-x-2">
                                            <span>{getFormattedTime(message.timestamp)}</span>
                                            {
                                                (message.senderId === userRef.current?.id)
                                                &&
                                                (message.status === "SENT" ? <span>✓</span>
                                                    :
                                                    message.status === "DELIVERED" ? <span>✓✓</span>
                                                        :
                                                        message.status === "READ" && <span className="text-sky-500">✓✓</span>)
                                            }
                                        </div>

                                    </li>
                                );
                            }
                        )
                }
            </ul>
        </div>
    );
}

export default Chat;