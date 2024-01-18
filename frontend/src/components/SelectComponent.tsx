import React from 'react';
import Select from 'react-select';

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
}

interface ArrayObjectSelectState {
    selectedVehicle: Vehicle | null;
}

const vehicles: Vehicle[] = [
    {
        id: 1,
        make: 'Ford',
        model: 'Fiesta',
        year: 2003,
    },
    // I hope that you did let the two dots on purpose
    // .
    // .
    {
        id: 7,
        make: 'Audi',
        model: 'A4',
        year: 2009,
    },
];

export default function VehiclePicker() {
    // I changed the position of the state here, that's how you should use the state in react
    // https://reactjs.org/docs/hooks-state.html#declaring-a-state-variable

    // If you don't need a state you can remove the following line
    const [state, setState] = React.useState<ArrayObjectSelectState>({
        selectedVehicle: null,
    });

    return (
        <div>
            <Select
                // If you don't need a state you can remove the two following lines value & onChange
                value={state.selectedVehicle}
                onChange={(option: Vehicle | null) => {
                    setState({ selectedVehicle: option });
                }}
                getOptionLabel={(vehicle: Vehicle) => vehicle.model}
                getOptionValue={(vehicle: Vehicle) => vehicle.model}
                options={vehicles}
                isClearable={false}
                backspaceRemovesValue={true}
            />
        </div>
    );
}