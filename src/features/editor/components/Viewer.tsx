import Image from '@tiptap/extension-image'
import { TableKit } from '@tiptap/extension-table'
import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export const Viewer = ({ content, isReceiver }: { content: string, isReceiver: boolean }) => {

    const parsedContent = JSON.parse(content);

    const html = generateHTML(parsedContent, [
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
    ])

    return (
        <div
            className={`tiptap-content bg-transparent! [&_table]:block! [&_table]:overflow-x-auto! [&_th]:bg-neutral-100! [&_th]:text-neutral-900! [&_td]:bg-blue-500! ${isReceiver && "text-neutral-900! [&_td]:text-white!"}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}