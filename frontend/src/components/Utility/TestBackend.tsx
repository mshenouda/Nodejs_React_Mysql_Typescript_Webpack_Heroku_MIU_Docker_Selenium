import { Button } from "@mui/material";
import React, { useState, FC, useEffect, MouseEventHandler, MouseEvent, SyntheticEvent } from "react";
import Input from "@mui/material";

interface types {
    Button1: boolean,
    Button2: boolean
}

const TestBackend: FC = () => {
    const [program, setProgram] = useState<types>({ Button1: false, Button2: false });
    const [text, setText] = useState<string>("");
  


    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {

        const name: any = e;
        console.log(e.target);

        if (name == "Button1") {
            console.log(name);
            setProgram((prev: types) => { return { ...program, Button1: !prev.Button1 } });
        }
        if (name == "Button2") {
            console.log(name);
            setProgram((prev: types) => { return { ...program, Button2: !prev.Button2 } });
        }
    };

    return (
        <>
            <h1>Button1: {program.Button1 ? "True" : "False"} </h1>
            <h1>Button2: {program.Button2 ? "True" : "False"} </h1>
            <Button aria-label="button1" onClick={handleClick}>Button 1</Button>
            <Button aria-label="button2" onClick={handleClick}>Button 2</Button>
        </>
    );
};


export default TestBackend;