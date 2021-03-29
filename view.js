// disable Ctrl++ and Ctrl+- to zoom

// View renders the data object passed to it by Model
class View {

    static render(d) {
        // reset classes on buttons
        let buttons = document.getElementsByClassName("button")
        for (let b of buttons) {
            b.className = "button"
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
        if (d.mode === "select") {
            document.getElementById("select").classList.add("currentState")
        }
        else if (d.mode === "move") {
            document.getElementById("move").classList.add("currentState")
        }
    }

}