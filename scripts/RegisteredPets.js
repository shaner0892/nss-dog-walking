import { getPets, getWalkers } from "./database.js"

//invoking the imported function and assigning it to a variable
const pets = getPets()
const walkers = getWalkers()

//adding a click event to the dog names to say who is walking them
//.addEventListener takes two or three parameters
document.addEventListener(
    //first argument is the type of event
    "click",
    //second argument is the function we want to call when the event occurs
    (clickEvent) => {
        //declaring a variable as what was clicked/"the target"(.target is a method)
        const itemClicked = clickEvent.target
        //now that you know where you clicked, you check if its id starts with "pet"
        if (itemClicked.id.startsWith("pet")) {
            //you are looking for the -- to know where to split, you don't care about what is before the --, just after so you label it petId since that's what you're looking for
            const [,petId] = itemClicked.id.split("--")
            //iterate through the pets array
            for (const pet of pets) {
                //if that pet's id equals the petId that was clicked on, you change it to an integer rather than a string
                if (pet.id === parseInt(petId)) {
                    //assigning a variable to an object
                    let assignedWalker = {name: ""}
                    //iterate through the walkers array
                    for (const walker of walkers) {
                        //checking if the walker.id equals the walker assigned to the pet
                        if (walker.id === pet.walkerId) {
                            //if they match, then add the walker.name to the empty object
                            assignedWalker.name = walker.name
                        }
                    }
                    //define the window alert message using string interpolation
                    window.alert(`${pet.name} is being walked by ${assignedWalker.name}.`)
                }
            }
        }
    }
)

//defining a function that prints a list of all the pets in an unordered list
export const RegisteredPets = () => {
    let petHTML = "<ul>"
    //for...of loop iterates through the pets and prints each one
    for (const pet of pets) {
        petHTML += `<li id="pet--${pet.id}">${pet.name}</li>`
    }
    petHTML += "</ul>"
    return petHTML
}
