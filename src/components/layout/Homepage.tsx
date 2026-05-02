import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Homepage = () => {
    return (
        <div className="w-screen h-dvh">
            <div className="flex items-center text-2xl gap-4">
                <HomeIcon />
                <p>Welcome!!</p>
            </div>
            <Link className="text-sky-500 font-medium" to={"/login"}>Go To Login →</Link>
        </div>
    );
}