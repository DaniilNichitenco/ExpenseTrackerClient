import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSessionStorageAsync = <T extends unknown>(key: string, fn: () => Promise<T>) => {

    useEffect(() => {
        const item = sessionStorage.getItem(key);
        if(item)
        {
            setValue(JSON.parse(item) as T);
        }
        else
        {
            fn().then(result => setValue(result))
                .catch(error => {
                    console.log("Error happens in useSessionStorageAsync hook, block 'useEffect'");
                    console.log(error);
                });
        }
    }, [])

    const [storedValue, setStoredValue] = useState<T>() as [T, Dispatch<SetStateAction<T>>];

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
            console.log("Error happens in useSessionStorageAsync hook, block 'setValue'");
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

export default useSessionStorageAsync;