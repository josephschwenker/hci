// Model contains all of the internal logic for the backend
class Model {

    // all the data needed to render the interface
    static #data = {
        words: [],
        selected: 0,
        //modes = ["select", "move"]
        mode: "select",
    }

    static #dictionary = []

    static #currentCondition = -1

    static #numberOfRandomWords = 20

    static #numberOfShuffles = 20
    
    // button actions
    
    static select(direction) {
        // ignore if out of bounds
        if (this.#data.selected + direction < this.#data.words.length && this.#data.selected + direction >= 0) {
            this.#data.selected = this.#data.selected + direction
        }
    }
    
    static changeMode(newMode) {
        this.#data.mode = newMode
    }

    static changeToSelect() {
        this.changeMode("select")
    }

    static changeToMove() {
        this.changeMode("move")
    }
    
    static move(index, direction) {
        let oldWord = this.#data.words[index]
        let newWord = this.#data.words[index+direction]
        // swap words
        this.#data.words[index] = newWord
        this.#data.words[index+direction] = oldWord
    }

    static upDown(direction) {
        if (this.#data.mode === "select") {
            this.select(-direction)
        }
        else if (this.#data.mode === "move") {
            this.move(this.#data.selected, -direction)
        }
    }

    static up() {
        Model.upDown(1)
    }

    static down() {
        Model.upDown(-1)
    }
    
    static submit() {
        window.alert("A winner is you!")
    }

    // backend functions

    static initializeDictionary () {
        this.#dictionary = dictionaryString.split("\n")
    }

    static getNewWords(n) {
        let length = this.#dictionary.length
        let newWords = []
        // get a random list of words
        for (let i=0; i<n; i++) {
            let randomIndex = Math.floor( Math.random()*length )
            newWords.push( this.#dictionary[randomIndex] )
        }
        // alphabetize the words
        newWords.sort()

        newWords = this.shuffleWords(newWords)

        return newWords
    }

    static shuffleWords(words) {
        // select an arbitrary number of random words
        console.log("this.numberOfShuffles: " + this.#numberOfShuffles)
        for (let i=0; i<this.#numberOfShuffles; i++) {
            let randomIndex = Math.floor( Math.random()*words.length )
            let nextIndex = (randomIndex + 1) % words.length
            console.log(`Swapping indices ${randomIndex} and ${nextIndex}.`)
            // then move it forward (modulus) once
            let first = words[randomIndex]
            let second = words[nextIndex]
            words[randomIndex] = second
            words[nextIndex] = first
        }
        return words
    }

    static nextCondition() {
        // change to select mode
        this.#data.mode = "select"
        // reset currently-selected word
        this.#data.selected = 0
        // get a new list of words
        this.#data.words = this.getNewWords(this.#numberOfRandomWords)
        // increment the current condition
        this.#currentCondition++
    }

    static getData() {
        return this.#data
    }

    static init() {
        Model.initializeDictionary()
        Model.nextCondition()
    }

}