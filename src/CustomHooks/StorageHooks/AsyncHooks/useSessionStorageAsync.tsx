import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSessionStorageAsync = <T extends unknown>(key: string, fn: () => Promise<T>) => {

    useEffect(() => {
        console.log(key);
        const item = sessionStorage.getItem(key);
        console.log(item);

        const fetch = async () => {
            // fn().then(result => {
            //     setValue(result);
            //     console.log(result);
            // })
            //     .catch(error => {
            //         console.log("Error happens in useSessionStorageAsync hook, block 'useEffect'");
            //         console.log(error);
            //     });
            const item = await fn();
            console.log("fetch:" + item);
            setValue(item);
        }

        if(item != null && item != "undefined")
        {
            console.log("parse");
            setValue(JSON.parse(item) as T);
        }
        else
        {
            console.log("fetch");
            fetch().then();
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