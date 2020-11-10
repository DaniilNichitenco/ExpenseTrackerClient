import ISignInFormData from "../FormDatas/ISignInFormData";

interface ISignInFormProps
{
    handleClose(): void,
    signIn(formValues: ISignInFormData): void
}

export default ISignInFormProps;