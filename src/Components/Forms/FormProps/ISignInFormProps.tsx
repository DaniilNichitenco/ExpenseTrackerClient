interface ISignInFormProps
{
    handleClose(): void,
    signIn(login: string, password: string): void
}

export default ISignInFormProps;