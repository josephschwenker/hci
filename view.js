// View renders the data object passed to it by Model
class View {

    static render(d) {

        // hide all other screens
        let screens = document.getElementsByClassName("screen")
        for (let s of screens) {
            if ( !s.classList.contains(d.screen) ) {
                s.style.display = "none"
            }
        }

        // show the current screen
        if ( d.screen != "alphabetizationTask" && d.screen != "training" ) {
            let screen = document.getElementById(d.screen)
            screen.style.display = "initial"
        }
        else if ( d.screen == "alphabetizationTask" || d.screen == "training" ) {

            let alphabetizationTask = document.getElementById("alphabetizationTask")
            // reset classes on buttons
            let buttons = alphabetizationTask.getElementsByClassName("button")
            for (let b of buttons) {
                b.className = "button"
            }

            // apply style conditions to buttons
            for (let b of buttons) {
                b.style.marginBottom = d.condition.marginBottom + "px"
                b.style.width = d.condition.buttonWidth + "px"
                b.style.height = d.condition.buttonHeight + "px"
            }

            // clear the existing word list
            let wordList = document.getElementById("wordList")
            let words = wordList.children
            for (let i=words.length || 0; i>0; i--) {
                words[0].remove()
            }
            // add the new words
            for (let w of d.words) {
                let div = document.createElement("div")
                div.className = "word"
                div.textContent = w
                // append to parent
                wordList.append(div)
            }
            // mark the selected word
            wordList.children[d.selected].classList.add("selected")

            // mark which mode we are in
            if (d.inputMode === "select") {
                document.getElementById("select").classList.add("currentState")
            }
            else if (d.inputMode === "move") {
                document.getElementById("move").classList.add("currentState")
            }

            // show the screen
            alphabetizationTask.style.display = "initial"
        }
    }

}