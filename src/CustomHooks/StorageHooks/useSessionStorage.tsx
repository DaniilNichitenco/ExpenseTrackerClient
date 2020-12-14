import { useEffect, useState } from "react";

const useSessionStorage = <T extends unknown>(key: string, initialValue:T, check = false) => {

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

    useEffect(() => {
        if(check)
        {
            setInterval(() => {
                const itemStr = sessionStorage.getItem(key);
                if(itemStr != null)
                {
                    try
                    {
                        const item = JSON.parse(itemStr) as T;
                        setStoredValue(item);
                    }
                    catch(error: any)
                    {
                        console.log(error);
                    }
                }
            }, 3000);
        }
    }, []);

    return [storedValue, setValue, removeValue] as const;
}

export default useSessionStorage;