import { getPets, getWalkerCities, getWalkers, getCities } from "./database.js"

// Get copy of state for use in this module
const pets = getPets()
const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()

// Function whose responsibility is to find the walker assigned to a pet
const findWalker = (pet, walkers) => {
    let petWalker = null
    //iterates through the array of walkers and if their id === petwalkerid that is their walker
    for (const walker of walkers) {
        if (walker.id === pet.walkerId) {
            petWalker = walker
        }
    }
    return petWalker
}

//finds all the cities that a walker works in
const findWalkerCity = (walker, walkerCities) => {
    let allWalkerCities = []
    //iterates through the walkerCities array and if the walkers id === the walkercitiesd then it pushes the city to the new array
    for (const city of walkerCities) {
        if (city.walkerId === walker.id) {
            allWalkerCities.push(city)
        }
    }
    return allWalkerCities
    //outputs [{ id: 1, walkerId: 10, cityId: 1 }, { id: 14, walkerId: 10, cityId: 2 }]
}

//how do you know which city the pet is in? The walkers service multiple areas?
//finds the city the pet is currently being walked in
const findCurrentCity = (cities, allWalkerCities) => {
    let currentWalkerCity = ""
    //iterates through the array returned from the above function 
    for (const walkerCity of allWalkerCities) {
        //iterates through the cities array to see if the ids match and then pushes it to the empty array
        for (const city of cities) {
            if (walkerCity.cityId === city.id) { 
                currentWalkerCity += `${city.name}`
        }
    }
    return currentWalkerCity
    }
}

//function that displays current assignments in html string/list
export const Assignments = () => {
    let assignmentHTML = ""
    assignmentHTML = "<ul>"

//iterating through the pets array, for each pet you use the above functions to find the walker and city they're in
    for (const currentPet of pets) {
        const currentPetWalker = findWalker(currentPet, walkers)
        const allWalkerCities = findWalkerCity(currentPetWalker, walkerCities)
        const currentCity = findCurrentCity(cities, allWalkerCities)
        //add to the empty UL with HTML/string interpolation to print the current assignments
        assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${currentCity}
            </li>
        `
    }
    assignmentHTML += "</ul>"
    return assignmentHTML
}
