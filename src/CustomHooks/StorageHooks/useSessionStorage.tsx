import { useState } from "react";

const useSessionStorage = <T extends unknown>(key: string, initialValue:T) => {

    const [storedValue, setStoredValue] = useState<T>(() => {
        try
        {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch(error)
        {
            console.log("Error happens in useSessionStorage hook, block 'storedValue'");
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try
        {
            const valueToStore = value instanceof Function ?
                value(storedValue) : value;
            
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch(error)
        {
            console.log("Error happens in useSessionStorage hook, block 'setValue'");
            console.log(error);
        }
    }

    const removeValue = () => {
        const item = localStorage.getItem(key);
        if(item != null)
        {
            localStorage.removeItem(key);
        }
    }

    return [storedValue, setValue, removeValue] as const;
}

export default useSessionStorage;