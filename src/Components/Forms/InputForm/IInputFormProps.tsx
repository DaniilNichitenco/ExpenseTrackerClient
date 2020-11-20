import { FieldError, DeepMap } from 'react-hook-form';

interface IInputFormProps
{
    name: string,
    label: string,
    errorObj: DeepMap<Record<string, any>, FieldError>,
    autoFocus?: boolean,
    required?: boolean,
    autoComplete?: string,
    type?: string,
    variant?:"filled" | "outlined" | "standard" | undefined
}

export default IInputFormProps;