import { useLayoutEffect, useState } from "react";

const useWindowHeight = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight); 

    useLayoutEffect(() => {
        const updateHeight = () => {
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener("resize", updateHeight);
        updateHeight();
        return () => window.removeEventListener("resize", updateHeight);
    }, []);
    return windowHeight;
}

export default useWindowHeight;