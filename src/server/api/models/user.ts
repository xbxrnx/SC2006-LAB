export interface UserProps {
    id: string;
    firstName: string,
    lastName: string
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User{
    constructor(private readonly props: Readonly<UserProps>){}

    public getValue(): UserProps{
        return this.props;
    }

    public setNames(
        firstName: string,
        lastName: string
    ) {
        return new User({
            ...this.props,
            firstName,
            lastName
        })
    }
}