// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
   let msnTarget = document.getElementById("missionTarget");
   msnTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
   `
}

function validateInput(testInput) {
    let numberInput = Number(testInput)
    if (testInput === "") {
        return "Empty"
    }
    else if (isNaN(numberInput)) {
        return "Not a Number"
    }
    else return "Is a Number"

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let fuel = document.getElementById("fuelStatus")
    let cargo = document.getElementById("cargoStatus")
    let launchStatus = document.getElementById("launchStatus")

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All field are required!")
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Incorrect data Type")
    } else {
        list.style.visibility = "visible"
        pilotStatus.innerText = `Pilot ${pilot} is ready for launch.`
        copilotStatus.innerText = `Copilot ${copilot} is ready for launch.`

        if (fuelLevel < 10000) {
            list.style.visibility = "visible"
            fuel.innerText = "Not enough fuel for the journey"
            launchStatus.innerText = "Shuttle not ready for launch"
            launchStatus.style = "color: red"

        } else if (cargoLevel > 10000) {
            list.style.visibility = "visible"
            cargo.innerText = "There is too much mass for the shuttle to take off"
            launchStatus.innerText = "Shuttle not ready for launch"
            launchStatus.style = "color: red"

        } else {
            launchStatus.innerText = "Shuttle is ready for launch"
            launchStatus.style = "color: green"
        }
       
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then(function (response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let pId = Math.floor(Math.random() * planets.length);
    return planets[pId]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
