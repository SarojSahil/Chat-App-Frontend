import { useEffect, useState } from "react";

type DebounceProps = {
    value: any,
    delay: number
}

export const useDebounce = <T>({ delay, value }: DebounceProps): T => {
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}