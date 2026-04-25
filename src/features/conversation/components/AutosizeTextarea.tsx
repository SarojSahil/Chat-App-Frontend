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

            const numOfLines = elem.scrollHeight / 24;
            const newHeight = Math.min(24 * numOfLines, 24 * 6);
            const padding = 16;

            elem.style.height = newHeight + "px";
            elem.parentElement.style.height = newHeight + padding + "px";
        }
    }

    return (
        <div className="flex-1 h-10 py-2 px-4 bg-white rounded-[1.3rem] border border-neutral-300 focus-within:ring-2">
            <textarea rows={1} onInput={handleInput} required={true} ref={inputRef} id={id} name={name} className="w-full h-6 resize-none outline-none" />
        </div>
    );
}