import { useRef } from 'react';
import { useAsync } from 'react-use';

const useAsyncOnce = (fn, deps = []) => {
    const isCalledRef = useRef(false);

    const wrappedFn = async (...args) => {
        if (isCalledRef.current) {
            return;
        }
        isCalledRef.current = true;
        return await fn(...args);
    };

    const result = useAsync(wrappedFn, deps);

    // Reset the flag when dependencies change
    if (deps.length > 0) {
        isCalledRef.current = false;
    }

    return result;
};

export default useAsyncOnce;
