// disable Ctrl++ and Ctrl+- to zoom

// View renders the data object passed to it by Model
class View {

    static render(d) {

        // render differently for each screen

        // hide all other screens

        let screens = document.getElementsByClassName("screen")
        for (let s of screens) {
            if ( !s.classList.contains(d.screen) ) {
                s.style.display = "none"
            }
        }

        if ( d.screen == "researcherInput" ) {
            let researcherInput = document.getElementById("researcherInput")
            researcherInput.style.display = "initial"
        }
        else if ( d.screen == "generalInstructions" ) {
            let generalInstructions = document.getElementById("generalInstructions")
            generalInstructions.style.display = "initial"
        }
        else if ( d.screen == "alphabetizationTask" ) {

            let alphabetizationTask = document.getElementById("alphabetizationTask")
            // reset classes on buttons
            let buttons = alphabetizationTask.getElementsByClassName("button")
            for (let b of buttons) {
                b.className = "button"
            }

            // clear the existing word list
            let wordList = alphabetizationTask.getElementById("wordList")
            let words = wordList.children
            for (let i=words.length || 0; i>0; i--) {
                words[0].remove()
            }
            // add the new words
            for (let w of d.words) {
                let div = alphabetizationTask.createElement("div")
                div.className = "word"
                div.textContent = w
                // append to parent
                wordList.append(div)
            }
            // mark the selected word
            wordList.children[d.selected].classList.add("selected")

            // mark which mode we are in
            if (d.inputMode === "select") {
                alphabetizationTask.getElementById("select").classList.add("currentState")
            }
            else if (d.inputMode === "move") {
                alphabetizationTask.getElementById("move").classList.add("currentState")
            }

            // show the screen
            alphabetizationTask.style.display = "initial"
        }
    }

}