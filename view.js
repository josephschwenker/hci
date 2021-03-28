// disable enter/space to click button

// disable Ctrl++ and Ctrl+- to zoom

class View {

    static render(d) {
        // clear the existing word list
        let words = document.getElementById("wordList")?.children
        for (let i=words.length || 0; i>0; i--) {
            words[0].remove()
        }
    }
}