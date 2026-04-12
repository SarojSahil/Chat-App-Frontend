import { type FC } from "react";
import { createPortal } from "react-dom";

type ConsentModalProps = {
    open: boolean,
    handleCancel: () => void,
    handleAction: () => void,
    title: string,
    message: string,
    action: string
};

export const ConsentModal: FC<ConsentModalProps> = ({ open, handleCancel, handleAction, action, message, title }) => {
    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/50 grid place-items-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">
                    {title}
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-1 border rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAction}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        {action}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};