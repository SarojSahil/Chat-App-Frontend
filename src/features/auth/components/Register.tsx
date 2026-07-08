import { useRegister } from "@/features/auth/lib";
import type { SyntheticEvent } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const BACKGROUND_ICONS = [
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 9h.01 M12 9h.01 M16 9h.01" />,
    <path d="M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z" />
];

export const Register = () => {
    const { mutate: register, isPending } = useRegister();
    const rootRef = useRef<HTMLDivElement | null>(null);

    const [step, setStep] = useState(1);

    const [data, setData] = useState({
        name: "",
        phoneNumber: "",
        password: "",
        profilePicture: null as File | null
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleNext = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("password", data.password);
        if (data.profilePicture) {
            formData.append("profilePicture", data.profilePicture);
        }

        register(formData);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".register-card", {
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
                stagger: { amount: 2, from: "random" }
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    const iconElements = useMemo(() => {
        return Array.from({ length: 20 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * (30 - 18) + 18}px`,
            pathIndex: Math.floor(Math.random() * BACKGROUND_ICONS.length)
        }));
    }, []);

    return (
        <div ref={rootRef} className="relative min-h-screen flex items-center justify-center bg-zinc-50 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                {iconElements.map((icon, i) => (
                    <div
                        key={i}
                        className="floating-icon absolute text-blue-600"
                        style={{ top: icon.top, left: icon.left, fontSize: icon.size }}
                    >
                        <svg width="1em" height="1em" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2">
                            {BACKGROUND_ICONS[icon.pathIndex]}
                        </svg>
                    </div>
                ))}
            </div>

            <div className="register-card relative z-10 w-full max-w-90 p-8 mx-4 rounded-lg bg-white border border-zinc-200">

                <div className="mb-8 text-center">
                    <div className="mx-auto w-14 h-14 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                        {step === 1 ? "Create Account" : "Add Profile Picture"}
                    </h1>

                    <p className="text-zinc-500 font-medium text-sm mt-1">
                        Step {step} of 2
                    </p>
                </div>

                {step === 1 && (
                    <form onSubmit={handleNext} className="space-y-4">

                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="w-full px-5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 outline-none text-lg font-medium placeholder:font-normal"
                        />

                        <input
                            name="phoneNumber"
                            type="text"
                            required
                            placeholder="Phone Number"
                            value={data.phoneNumber}
                            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                            className="w-full px-5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 outline-none text-lg font-medium placeholder:font-normal"
                        />

                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            className="w-full px-5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 outline-none text-lg font-medium placeholder:font-normal"
                        />

                        <button className="w-full py-2.5 mt-2 text-lg font-medium rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white shadow-lg">
                            Continue
                        </button>

                        <div className="flex items-center gap-3 my-4">
                            <div className="flex-1 h-px bg-zinc-200" />
                            <span className="text-sm text-zinc-400 font-medium">or</span>
                            <div className="flex-1 h-px bg-zinc-200" />
                        </div>

                        <p className="text-center text-sm text-zinc-500">
                            Already have an account?
                            <Link to={"/login"} className="text-blue-600 font-bold hover:underline">
                                &nbsp;Sign in&nbsp;
                            </Link>
                        </p>

                    </form>
                )}

                {step === 2 && (
                    <div className="space-y-6">

                        <div className="flex justify-center">
                            <label className="cursor-pointer">
                                <div className="w-24 h-24 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-zinc-500 text-sm font-medium">Upload</span>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData({ ...data, profilePicture: file });
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-lg font-medium w-full py-2.5 rounded-lg border border-zinc-200 active:scale-95 transition"
                            >
                                Back
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isPending}
                                className="w-full py-2.5 rounded-lg text-lg bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white font-medium"
                            >
                                {isPending ? "Creating..." : "Finish"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};