const form = document.querySelector('#testDataForm');
form.addEventListener('submit', ( event ) =>{
    event.preventDefault()
    let query_first = document.querySelector('#season')
    let query_last = document.querySelector('#round')
    info = getData(query_first, query_last)
    load_data(info)

})
// Get Data from ergast

const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season.value}/${round.value}/driverStandings.json`)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7)
}

// create Constrants to hold DOM elements
const DOM_elements = {
    racer_list : '.racer-list'
}

// Creation of the racer List HTML

const add_table = (position, name, nationality, sponsor, points) => {
    const html = `<a class="list-group-item list-group-item-action list-group-item-light tab-space"> ${position} ${name} ${nationality} ${sponsor} ${points}</a>`
    document.querySelector(DOM_elements.racer_list).insertAdjacentHTML('beforeend', html)
    
}
// Function to Load Data and Display HTML

const load_data = async (info) => {
    
    const racers = await info;
    racers.forEach( element => add_table(element.position, element.Driver.givenName + '-' + element.Driver.familyName, element.Driver.nationality, element.Constructors[0].name.replace(' ',''), element.points))
}

// Function to clear data from html

const clear_data = () => {
    document.querySelector(DOM_elements.racer_list).innerHTML = "";
}