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
    variant?:"filled" | "outlined" | "standard",
    defaultValue?: string,
    disabled?: boolean,
    select?: {
        select: boolean,
        items: {id: number, label: string}[],
        upperCase?: boolean
    }
}

export default IInputFormProps;