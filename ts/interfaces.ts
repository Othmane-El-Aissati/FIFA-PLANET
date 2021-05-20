// Required user information to register 
interface IUser {
    name :string,
    password :string,
    email :string,
    travel :string,
    score :number,
}

interface IClubs{
    id :number,
    name :string,
    league :number
}

interface ILeague{
    id: number,
    name: string
}

export{IUser, IClubs, ILeague};