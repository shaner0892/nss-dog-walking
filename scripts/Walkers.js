import { getWalkers, getWalkerCities, getCities } from "./database.js"

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const assignments = filterWalkerCitiesByWalker(walker)
                    const cities = assignedCityNames(assignments)
                    window.alert(`${walker.name} services ${cities}`)
                }
            }
        }
    }
)

const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML

}

// The function needs the walker information, so define a parameter
const filterWalkerCitiesByWalker = (walker) => {
    // Define an empty array to store all of the assignment objects
    const assignmentArray = []
    // Iterate the array value of walkerCities
    for (const assignment of walkerCities) {  
    // Check if the primary key of the walker equals the foreign key on the assignment
        if (assignment.walkerId === walker.id) {
        // If it does, add the current object to the array of assignments
            assignmentArray.push(assignment)
        }
    }
    // After the loop is done, return the assignments array
    return assignmentArray
}

// Define a function that builds a string of city names. Needs a paramter for assignments array.
const assignedCityNames = (assignmentArray) => {
    // Define an empty string that will get appended with matching cities
    let matchingCities = ""
    // Iterate the array of assignment objects
    for (const assignment of assignmentArray) {
        // For each assignment, iterate the cities array to find the match
        for (const city of cities) {
            if (city.id === assignment.cityId) {
                // Add the name of the matching city to the array of city names
                if (matchingCities === "") {
                    matchingCities += `${city.name}`
                } else {
                    matchingCities += ` and ${city.name}`
                }
            }
        }
    }
    // After the loop is done, return the string
    return matchingCities
}