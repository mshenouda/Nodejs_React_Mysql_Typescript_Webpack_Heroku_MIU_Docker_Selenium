//React libraries
import React, { useState, FC} from 'react';

//Material ui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

//CONSTANTS
const ITEM_HEIGHT = 200;
const ITEM_PADDING_TOP = 10;
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
        minWidth: 100,
        maxWidth: 300,
        margin: '0px',
        borderColor: 'primary',
        padding: '10px 10px 10px 10px',
    },
    inputLabel: {
        height: 30,
        fontSize: 20,
        color: 'primary',
        padding: '0px 0px 0px 0px',
        margin: '0px 0px 0px 0px',
    },
    selected: {
        padding: '0px 0px 0px 0px',
        backgroundColor: 'primary',
        fontSize: 20,
    },
    img: {
        width: '20px',
        height: '20px'
    }
};

type MyRecord = {
    name: string,
    src: string
};

type Props = {
    label: string,
    records: any
    disabled: boolean
};

const Selector: FC<Props> = ({ label, records, disabled }) => {
    const [selected, setSelected] = useState<string>("");
    const handleChange = (e: SelectChangeEvent): void => setSelected(e.target.value);
    const upperCase = (s: string) => s.toUpperCase();

    return (
        <FormControl disabled={disabled} fullWidth sx={styles.formControl} variant="outlined">
            <InputLabel sx={styles.inputLabel} id="label">{label}</InputLabel>
            <Select sx={styles.selected} value={selected} variant='outlined' MenuProps={MenuProps} onChange={handleChange}>
                {records.map((record: any) => (record['name'] && <MenuItem key={label + record['name']} value={upperCase(record["name"])}>
                    <img src={record["src"]} alt={record["name"]} style={styles.img} />
                    &nbsp;&nbsp;&nbsp; {upperCase(record["name"])} </MenuItem>))}
            </Select>
        </FormControl >
    );
}
export default Selector;