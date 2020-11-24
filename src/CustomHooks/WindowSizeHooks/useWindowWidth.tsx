import { useLayoutEffect, useState } from "react";

const useWindowWidth = () => {
    const [useWindowWidth, setuseWindowWidth] = useState(window.innerWidth); 

    useLayoutEffect(() => {
        const updateWidth = () => {
            setuseWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateWidth);
        updateWidth();
        return () => window.removeEventListener("resize", updateWidth);
    }, []);
    return useWindowWidth;
}

export default useWindowWidth;