import { fetchLeagues, leagues } from "./fetchFutDB";

let a :string = ".";

let someoutput = async () => {
    await fetchLeagues();
    a = await leagues[3].name;
    console.log(await leagues[1].id);
    console.log(await leagues[1].name);
    console.log(await leagues[2].name);


};console.log(a);
someoutput();
// fetchLeagues();
