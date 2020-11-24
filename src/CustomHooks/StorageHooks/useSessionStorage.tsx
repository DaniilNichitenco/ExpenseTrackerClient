import { useState } from "react";

const useSessionStorage = <T extends unknown>(key: string, initialValue:T) => {
    


    const [storedValue, setStoredValue] = useState<T>(() => {
        try
        {
            const item = sessionStorage.getItem(key);
            if(item != null && item != "undefined")
            {
                return JSON.parse(item);
            }
            return initialValue;
        }
        catch(error)
        {
            console.log("Error happens in useSessionStorage hook, useCustomState func, block 'storedValue'");
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
            sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch(error)
        {
            console.log("Error happens in useSessionStorage hook, block 'setValue'");
            console.log(error);
        }
    }

    const removeValue = () => {
        const item = sessionStorage.getItem(key);
        if(item != null)
        {
            sessionStorage.removeItem(key);
        }
    }

    return [storedValue, setValue, removeValue] as const;
}

export default useSessionStorage;