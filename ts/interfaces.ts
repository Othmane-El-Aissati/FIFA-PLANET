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

interface ICombo{
    club: string,
    clubLeague: number,
    league: string,
    leagueId: number
}

export{IUser, IClubs, ILeague, ICombo};