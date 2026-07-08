import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import { Image } from "@tiptap/extension-image";
import { Minus, Plus, SendHorizonal } from "lucide-react";

export const Editor = ({ handleSendMessage, close }: { handleSendMessage: (message: string) => void, close: () => void }) => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image,
            TableKit.configure({
                table: {
                    resizable: true,
                },
            }),
        ],
        content: "Type your message here..."
    });

    return (
        editor
        &&
        <div className="flex-1 flex flex-col overflow-x-hidden relative">
            <div className="w-full flex overflow-x-auto gap-x-2 px-2 pt-2 flex-nowrap [&>button]:bg-blue-100 [&>button]:p-2 [&>button>svg]:mx-auto [&>button]:rounded-lg">

                <button onClick={() => editor.commands.toggleBold()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" /></svg>
                </button>

                <button onClick={() => editor.commands.toggleItalic()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" /></svg>
                </button>

                <button onClick={() => editor.commands.toggleUnderline()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120v-80h560v80H200Zm123-223q-56-63-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63q-101 0-157-63Z" /></svg>
                </button>

                <button onClick={() => editor.commands.setHorizontalRule()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-440v-80h640v80H160Z" /></svg>
                </button>

                <button onClick={() => editor.commands.toggleHeading({ level: 1 })}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z" /></svg>
                </button>

                <button onClick={() => editor.commands.toggleHeading({ level: 2 })}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z" /></svg>
                </button>

                <button onClick={() => editor.commands.toggleHeading({ level: 3 })}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z" /></svg>
                </button>

                <button onClick={() => editor.commands.toggleBulletList()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" /></svg>
                </button>

                <button onClick={() => editor.commands.toggleOrderedList()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z" /></svg>
                </button>

                <button
                    onClick={() => {
                        const url = prompt('Enter image URL')
                        if (url) editor.commands.setImage({ src: url })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" /></svg>
                </button>

                <button
                    onClick={() =>
                        editor.commands.insertTable({
                            rows: 2,
                            cols: 2,
                            withHeaderRow: true,
                        })
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm240-240H200v160h240v-160Zm80 0v160h240v-160H520Zm-80-80v-160H200v160h240Zm80 0h240v-160H520v160ZM200-680h560v-80H200v80Z" /></svg>
                </button>

                <button className="flex items-center gap-2" onClick={() => editor.commands.addRowAfter()}>
                    <Plus className="inline" />
                    <div className="text-nowrap">Insert Row</div>
                </button>

                <button className="flex items-center gap-2" onClick={() => editor.commands.addColumnAfter()}>
                    <Plus className="inline" />
                    <div className="text-nowrap">Insert Column</div>
                </button>

                <button className="flex items-center gap-2" onClick={() => editor.commands.deleteRow()}>
                    <Minus className="inline" />
                    <div className="text-nowrap">Delete Row</div>
                </button>

                <button className="flex items-center gap-2" onClick={() => editor.commands.deleteColumn()}>
                    <Minus className="inline" />
                    <div className="text-nowrap">Delete Column</div>
                </button>

                <button className="flex items-center gap-2" onClick={() => editor.commands.deleteTable()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    <div className="text-nowrap">Delete Table</div>
                </button>

            </div>

            <button
                onClick={() => handleSendMessage(JSON.stringify(editor.getJSON()))}
                className="absolute z-20 bg-blue-600 bottom-4 right-4 hover:bg-blue-700 active:scale-95 transition text-white rounded-full h-12 w-12 grow-0 grid place-items-center">
                <SendHorizonal size={24} />
            </button>

            <button
                onClick={close}
                className="absolute z-20 bg-red-600 bottom-18 right-4 hover:bg-red-700 active:scale-95 transition text-white rounded-full h-12 w-12 grow-0 grid place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
            </button>

            <EditorContent editor={editor} className="tiptap-content flex-1 overflow-y-auto [&>div]:outline-none! p-4" id="message-editor" />
        </div>
    )
}