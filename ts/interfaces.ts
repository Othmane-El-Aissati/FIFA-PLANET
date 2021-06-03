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

interface ICurrentUser{
    name: string,
    travel: string
}

interface ILeagueReturnType{
    correctPosition :number,
    chosenName : string,
    anwsers : string[]
}

interface ISeparatedClubs{
    correctClubs :string[],
    wrongClubs :string[]
} 

export{IUser, IClubs, ILeague, ICombo, ICurrentUser, ILeagueReturnType, ISeparatedClubs};