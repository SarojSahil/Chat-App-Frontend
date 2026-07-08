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

export const ConsentModal: FC<ConsentModalProps> = ({
    open,
    handleCancel,
    handleAction,
    action,
    message,
    title
}) => {
    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

            {/* Modal */}
            <div className="w-full max-w-sm rounded-xl bg-white border border-zinc-200 shadow-xl p-8 animate-in fade-in zoom-in-95 duration-200">

                {/* Title */}
                <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-sm text-zinc-700 mb-6 leading-relaxed">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={handleCancel}
                        className="px-8 py-2.5 rounded-lg border active:scale-90 border-zinc-500 hover:bg-zinc-100 transition text-sm font-medium"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAction}
                        className="px-8 py-2.5 rounded-lg bg-red-500 active:scale-90 text-white hover:bg-red-600 transition text-sm font-semibold shadow-md shadow-red-200"
                    >
                        {action}
                    </button>

                </div>
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};