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

        // hide keyboard shortcut message
        document.getElementById("keyboardShortcutsAvailable").style.display = "none"
        document.getElementById("keyboardShortcutsNotAvailable").style.display = "none"

        // set an attribute on the survey next button if the next screen is the last one
        if (d.isLastScreen) {
            let surveyNext = document.getElementById("surveyNext")
            surveyNext.setAttribute("data-isLastScreen", "true")
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

            // display whether keyboard shortcuts are available or not
            if (d.condition.keyboardShortcutsEnabled) {
                document.getElementById("keyboardShortcutsAvailable").style.display = "initial"
                document.getElementById("keyboardShortcutsNotAvailable").style.display = "none"
            }
            else {
                document.getElementById("keyboardShortcutsAvailable").style.display = "none"
                document.getElementById("keyboardShortcutsNotAvailable").style.display = "initial"
            }

            // show the screen
            alphabetizationTask.style.display = "initial"
        }
    }

    static resetForms() {
        let beginStudy = document.getElementById("beginStudy")
        let survey = document.getElementById("surveyForm")
        beginStudy.reset()
        survey.reset()
    }

}