import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef, useState } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';
import {
    Alert,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';

export interface LabeledDropDownProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
    name: string;
    label: string;
    type?: 'text' | 'password' | 'email' | 'number';
    outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
    labelProps?: ComponentPropsWithoutRef<'label'>;
    fieldProps?: UseFieldConfig<string>;
    options: string[];
}

export const LabeledDropDown = forwardRef<HTMLInputElement, LabeledDropDownProps>(
    ({ name, label, outerProps, fieldProps, options, ...props }, ref) => {
        const {
            input,
            meta: { touched, error, submitError, submitting },
        } = useField(name, {
            parse:
                props.type === 'number'
                    ? (Number as any)
                    : // Converting `""` to `null` ensures empty values will be set to null in the DB
                      (v) => (v === '' ? null : v),
            ...fieldProps,
        });

        const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError;

        return (
            <Box {...outerProps}>
                <TextField
                    inputProps={props}
                    {...input}
                    disabled={submitting}
                    ref={ref}
                    label={label}
                    sx={{
                        margin: '.5em',
                        minWidth: '210px',
                    }}
                    select
                >
                    {options.map((v, i) => (
                        <MenuItem key={i} value={v}>
                            {v}
                        </MenuItem>
                    ))}
                </TextField>

                {touched && normalizedError && <Alert severity="error">{normalizedError}</Alert>}
            </Box>
        );
    },
);

export default LabeledDropDown;
