// disable enter/space to click button

// disable Ctrl++ and Ctrl+- to zoom

// View renders the data object passed to it by Model
class View {

    static render(d) {
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
    }
}