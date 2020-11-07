import { FieldError, DeepMap } from 'react-hook-form';

interface IInputFormProps
{
    name: string,
    label: string,
    errorObj: DeepMap<Record<string, any>, FieldError>,
    autoFocus?: boolean,
    required?: boolean,
    type?: string
}

export default IInputFormProps;