import { useRef, type FC } from "react";

type AutosizeTextareaProps = {
    name: string,
    id: string
}

export const AutosizeTextarea: FC<AutosizeTextareaProps> = ({ id, name }) => {

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        const elem = inputRef.current;
        if (elem && elem.parentElement) {

            elem.style.height = "auto";
            elem.parentElement.style.height = "auto";

            const numOfLines = elem.scrollHeight / 32;
            const newHeight = Math.min(32 * numOfLines, 32 * 6);
            const padding = 16;

            elem.style.height = newHeight + "px";
            elem.parentElement.style.height = newHeight + padding + "px";
        }
    }

    return (
        <div className="flex-1 h-12 py-2 px-4 bg-white rounded-[1.3rem] border border-neutral-300 focus-within:ring-2 transition">
            <textarea
                rows={1}
                onInput={handleInput}
                required={true}
                ref={inputRef}
                id={id}
                placeholder="Type a message..."
                name={name} className="w-full text-lg h-8 leading-8 resize-none outline-none" />
        </div>
    );
}