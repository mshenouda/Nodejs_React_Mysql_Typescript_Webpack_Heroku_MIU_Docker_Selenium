import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

type typeEdit = {
    id: number
    title: string
    description: string
    published: boolean   
}

interface stateType {
    sensorFormOnOff: boolean,
    refresh: boolean,
    editedData: typeEdit,
    setSensorFormOnOff: Dispatch<SetStateAction<boolean>>,
    setRefresh: Dispatch<SetStateAction<boolean>>,
    setEditedData: Dispatch<SetStateAction<typeEdit>>
}

export const SensorFormContext = createContext<stateType>({
    sensorFormOnOff: false,
    refresh: false,
    editedData: {id: 0, title: "", description: "", published: false},
    setSensorFormOnOff: (): void =>{},
    setRefresh: (): void =>{},
    setEditedData: (): void => {},
});

type contextType = {
    children?: ReactNode
}

export const SensorProvider = ({ children }: contextType) => {
    const [sensorFormOnOff, setSensorFormOnOff] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [editedData, setEditedData] = useState<typeEdit>({id: 0, title: "", description: "", published: false});

    return (
        <SensorFormContext.Provider value={{ sensorFormOnOff, setSensorFormOnOff, refresh, setRefresh, editedData, setEditedData }}>
            {children}
        </SensorFormContext.Provider>

    );
};
