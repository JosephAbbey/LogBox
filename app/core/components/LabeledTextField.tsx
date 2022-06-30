import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';
import { Alert, Input, TextField } from '@mui/material';

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
    /** Field name. */
    name: string;
    /** Field label. */
    label: string;
    /** Field type. Doesn't include radio buttons and checkboxes */
    type?: 'text' | 'password' | 'email' | 'number';
    outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
    labelProps?: ComponentPropsWithoutRef<'label'>;
    fieldProps?: UseFieldConfig<string>;
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
    ({ name, label, outerProps, fieldProps, ...props }, ref) => {
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
            <div {...outerProps}>
                <TextField
                    inputProps={props}
                    {...input}
                    disabled={submitting}
                    ref={ref}
                    label={label}
                    sx={{
                        margin: '.5em',
                    }}
                />

                {touched && normalizedError && <Alert severity="error">{normalizedError}</Alert>}
            </div>
        );
    },
);

export default LabeledTextField;
