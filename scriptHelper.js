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

function formSubmission(document, list, pilot, copilot, fuelLevelLevel, cargoLevelLevel) {
    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let fuelLevel = document.getElementById("fuelLevelStatus")
    let cargoLevel = document.getElementById("cargoLevelStatus")
    let launchStatus = document.getElementById("launchStatus")

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevelLevel) === "Empty" || validateInput(cargoLevelLevel) === "Empty") {
        alert("All field are required!")
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevelLevel) === "Not a Number" || validateInput(cargoLevelLevel) === "Not a Number") {
        alert("Incorrect data Type")
    } else {
        list.style.visibility = "visible"
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch.`
        copilotStatus.innerHTML = `Copilot ${copilot} is ready for launch.`

        if (fuelLevelLevel < 10000 && cargoLevelLevel <= 10000) {
            list.style.visibility = "visible"
            fuelLevel.innerHTML = "Not enough fuelLevel for the journey"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style = "color: red"

        } else if (cargoLevelLevel > 10000 && fuelLevelLevel >= 10000) {
            list.style.visibility = "visible"
            cargoLevel.innerHTML = "There is too much mass for the shuttle to take off"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style = "color: red"

        } else if (cargoLevelLevel > 10000 && fuelLevelLevel < 10000) {
            cargoLevel.innerHTML = "There is too much mass for the shuttle to take off"
            fuelLevel.innerHTML = "Not enough fuelLevel for the journey"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
        }
          else {
            cargoLevel.innerHTML = "Cargo mass low enough for launch"
            fuelLevel.innerHTML = "Fuel level high enough for launch"
            launchStatus.innerHTML = "Shuttle is ready for launch"
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
