import React, { ReactNode, createContext, useState,  Dispatch, SetStateAction } from 'react';

interface stateType {
    userName: string,
    setUserName: Dispatch<SetStateAction<string>>
}

export const UserNameContext = createContext<stateType>({
    userName: "",
    setUserName: () => {},
});

type contextType = {
    children?: ReactNode
}

export const UserNameProvider = ({ children }: contextType) => {
    const [userName, setUserName] = useState<string>("");
    return (
        <UserNameContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserNameContext.Provider>
    );
};