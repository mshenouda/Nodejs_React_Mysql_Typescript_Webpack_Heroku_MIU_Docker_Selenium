import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface stateType {
    sensorFormOnOff: boolean,
    refresh: boolean,
    // editId: number,
    setSensorFormOnOff: Dispatch<SetStateAction<boolean>>,
    setRefresh: Dispatch<SetStateAction<boolean>>,
    //setEditId: Dispatch<SetStateAction<number>>
}

export const SensorFormContext = createContext<stateType>({
    sensorFormOnOff: false,
    refresh: false,
    // editId:  | number,
    setSensorFormOnOff: (): void =>{ },
    setRefresh: (): void =>{ },
    //setEditId: (): void => { },
});

type contextType = {
    children?: ReactNode
}

export const SensorProvider = ({ children }: contextType) => {
    const [sensorFormOnOff, setSensorFormOnOff] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    //const [editId, setEditId] = useState<number>(0);
    return (
        // <SensorFormContext.Provider value={{ sensorFormOnOff, setSensorFormOnOff, refresh, setRefresh, editId, setEditId }}>
        <SensorFormContext.Provider value={{ sensorFormOnOff, setSensorFormOnOff, refresh, setRefresh }}>
            {children}
        </SensorFormContext.Provider>

    );
};
