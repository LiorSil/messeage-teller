import { useState } from "react";


export const useSearchMessage = () => {


    const [searchMessage, setSearchMessage] = useState<string>("");

    const handleSearchMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchMessage(e.target.value);
    };
    

    
    
    return {  };
    }