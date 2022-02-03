import { getCities } from "./database.js"

//invoking the imported functions and assigning them to variables
const cities = getCities()

//defining a new function that implements an html string/list
export const CityList = () => {
    let citiesHTML = "<ul>"
    //for...of loop that iterates through the cities array and prints each city name
    for (const city of cities) {
        citiesHTML += `<li>${city.name}</li>`
    }
    citiesHTML += "</ul>"
    return citiesHTML
}

