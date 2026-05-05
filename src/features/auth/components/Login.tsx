import { type SyntheticEvent, useLayoutEffect, useRef } from "react";
import { useLogin } from "@/features/auth/lib";
import type { LoginRequest } from "@/schema";
import gsap from "gsap";
import { Link } from "react-router-dom";

const BACKGROUND_ICONS = [
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 9h.01 M12 9h.01 M16 9h.01" />,
    <path d="M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z" />
];

export const Login = () => {
    const { mutate: login, isPending } = useLogin();
    const rootRef = useRef<HTMLDivElement | null>(null);

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const request: LoginRequest = {
            phoneNumber: formData.get("phoneNumber") as string,
            password: formData.get("password") as string,
        };
        login(request);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".login-card", {
                y: 70,
                opacity: 0,
                duration: 1.1,
                ease: "power4.out",
            });

            gsap.to(".floating-icon", {
                y: "random(-80, 80)",
                x: "random(-40, 40)",
                rotation: "random(-30, 30)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "expo",
                stagger: {
                    amount: 2,
                    from: "random"
                }
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    const iconElements = Array.from({ length: 20 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * (30 - 18) + 18}px`,
        pathIndex: Math.floor(Math.random() * BACKGROUND_ICONS.length)
    }));

    return (
        <div ref={rootRef} className="relative min-h-screen flex items-center justify-center bg-zinc-50 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none select-none">
                {iconElements.map((icon, i) => (
                    <div
                        key={i}
                        className="floating-icon absolute text-blue-600"
                        style={{ top: icon.top, left: icon.left, fontSize: icon.size }}
                    >
                        <svg
                            width="1em" height="1em" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            {BACKGROUND_ICONS[icon.pathIndex]}
                        </svg>
                    </div>
                ))}
            </div>

            <div className="login-card relative z-10 w-full max-w-90 p-8 mx-4 rounded-lg bg-white border border-zinc-200 ">

                <div className="mb-8 text-center">
                    <div className="mx-auto w-14 h-14 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Talksy</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Chatting made simple.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="phoneNumber" type="tel" required placeholder="Enter phone number"
                        className="placeholder:font-normal font-medium w-full px-5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 outline-none transition-all text-lg"
                    />

                    <input
                        name="password" type="password" required placeholder="password"
                        className="placeholder:font-normal font-medium text-lg w-full px-5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 outline-none transition-all"
                    />

                    <button
                        type="submit" disabled={isPending}
                        className="w-full py-2.5 text-lg mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition active:scale-80 disabled:opacity-50"
                    >
                        {isPending ? "Connecting..." : "Log In"}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-zinc-200" />
                    <span className="text-sm text-zinc-400 font-medium">or</span>
                    <div className="flex-1 h-px bg-zinc-200" />
                </div>

                <p className="text-center text-sm text-zinc-500">
                    New here?{" "}
                    <Link to={"/register"} className="text-blue-600 font-bold hover:underline">
                        &nbsp;Register&nbsp;
                    </Link>
                </p>
            </div>
        </div>
    );
};