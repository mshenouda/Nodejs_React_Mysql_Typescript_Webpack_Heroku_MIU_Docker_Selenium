//React libraries
import React, { useState} from 'react';

//Material ui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

//CONSTANTS
const ITEM_HEIGHT = 200;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT + ITEM_PADDING_TOP,
            width: 50,
        },
    },
};

const styles = {
    formControl: {
        // margin: theme.spacing(2),
        minWidth: 100,
        maxWidth: 300,
        margin: '10px',
        borderColor: 'primary',
        padding: '10px',
    },
    inputLabel: {
        height: 25,
        fontSize: 25,
        color: 'inherit',
        margin: '-0px 0px 0px 10px',
    },
    selected: {
        padding: '0px 0px 0px 0px',
        backgroundColor: 'primary',
        fontSize: 20,
    }
};

type MyRecord = {
    name: string,
    src: string
};

type Props = {
    label: string,
    records: any
};

const Selector: React.FC<Props> = ({ label, records }) => {
    //debugger;
    const [selected, setSelected] = useState<string>("");
    const handleChange = (e: SelectChangeEvent): void => setSelected(e.target.value);
    const upperCase = (s: string) => s.toUpperCase();

    return (
        <FormControl /*disabled={!selectorDisabled}*/ fullWidth sx={styles.formControl} variant="outlined">
            <InputLabel sx={styles.inputLabel} id="label">{label}</InputLabel>
            <Select sx={styles.selected} value={selected} variant='outlined' MenuProps={MenuProps} onChange={handleChange}>
                {records.map((record: any) => (record['name'] && <MenuItem key={label + record['name']} value={upperCase(record["name"])}>
                    <img src={record["src"]} alt={record["name"]} width="30px" height="30px" />
                    &nbsp;&nbsp;&nbsp; {upperCase(record["name"])} </MenuItem>))}
            </Select>

        </FormControl >
    );
}
export default Selector;