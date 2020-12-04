import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MenuItem, TextField } from '@material-ui/core';
import IInputFormData from './IInputFormProps';

const InputForm: React.FC<IInputFormData> = ({name, label, errorObj, autoFocus = false, 
    required = false, type="text", variant = "standard", autoComplete, defaultValue = "",
    disabled = false, select = {select:false, items: [], upperCase: false},
    }) => {

    const { control } = useFormContext();
    let isError: boolean = false;
    let errorMessage: string = "";
    if(errorObj.hasOwnProperty(name))
    {
        isError = true;
        errorMessage = errorObj[name].message;
    }

    if(select.select)
    {
        return(
            <Controller
                autoComplete={autoComplete}
                as={TextField}
                select
                type={type}
                margin="dense"
                autoFocus={autoFocus}
                name={name}
                control={control}
                label={label}
                fullWidth
                error={isError}
                InputLabelProps={{
                    required: required
                }}
                helperText={errorMessage}
                defaultValue={defaultValue}
                variant={variant}
                disabled={disabled}
            >
                {select.items.map((option) => {
                    let label: string = option.label;
                    if(select.upperCase)
                    {
                        label = label.toUpperCase();
                    }
                    return(
                    <MenuItem key={option.id} value={option.id}>
                        {label}
                    </MenuItem>
                );})}
            </Controller>
        )
    }

    return(
        <Controller 
            autoComplete={autoComplete}
            as={TextField}
            type={type}
            margin="dense"
            autoFocus={autoFocus}
            name={name}
            control={control}
            defaultValue={defaultValue}
            label={label}
            fullWidth
            error={isError}
            InputLabelProps={{
                required: required
            }}
            helperText={errorMessage}
            variant={variant}
            disabled={disabled}
        />
    )
}

export default InputForm;