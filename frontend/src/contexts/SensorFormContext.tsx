import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface stateType {
    sensorFormOnOff: boolean
    setSensorFormOnOff: Dispatch<SetStateAction<boolean>>
}

export const SensorFormContext = createContext<stateType>({
    sensorFormOnOff: false,
    setSensorFormOnOff: () => { },
});

type contextType = {
    children?: ReactNode
}

export const SensorProvider = ({ children }: contextType) => {
    const [sensorFormOnOff, setSensorFormOnOff] = useState<boolean>(false);
    return (
        <SensorFormContext.Provider value={{ sensorFormOnOff, setSensorFormOnOff }}>
            {children}
        </SensorFormContext.Provider>

    );
};