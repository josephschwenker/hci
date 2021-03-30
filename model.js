// TODO unique identifier for each participant, datetime?

// TODO refuse entry to non-Windows, non-Chrome browsers below version 89

// TODO send results to a Node.js server

// Model contains all of the internal logic for the backend
class Model {

    // global variables

    static #conditions = []

    static participant

    // all the data needed to render the interface

    /*
    Screen flow:
        researcherInput -> trainInstructions -> train -> taskInstructions -> condition1 -> survey -> taskInstructions -> condition2 -> survey -> taskInstructions -> condition3 -> survey -> taskInstructions -> condition4 -> survey -> result
    */
    static #data = {
        words: [],
        selected: 0,
        inputMode: "",
        screen: "researcherInput",
    }

    static #screens = []

    static #dictionary = []

    static #currentCondition = -1

    static #numberOfWords = 20

    static #numberOfShuffles = 20

    static #keyboardShortcutOdds = 0.5

    static #smallButton = 11

    static #largeButton = 100

    static #smallMargin = -1

    static #largeMargin = 100
    
    // button actions
    
    static select(direction) {
        this.#data.selected = this.#data.selected + direction
        // treat normally if in bounds
        if (this.#data.selected >= this.#data.words.length || this.#data.selected < 0) {
            // wrap around if out of bounds
            this.#data.selected %= this.#data.words.length
            if (this.#data.selected < 0) {
                this.#data.selected += this.#data.words.length
            }
        }
    }
    
    static changeMode(newMode) {
        this.#data.inputMode = newMode
    }

    static changeToSelect() {
        this.changeMode("select")
    }

    static changeToMove() {
        this.changeMode("move")
    }
    
    static move(index, direction) {
        // check for out of bounds
        let newIndex = index + direction
        // wrap around if out of bounds
        if ( newIndex < 0 || newIndex >= this.#data.words.length ) {
            // do magic
            newIndex %= this.#data.words.length
            if (newIndex < 0) {
                newIndex += this.#data.words.length
            }
        }

        // swap words
        let oldWord = this.#data.words[index]
        let newWord = this.#data.words[newIndex]
        this.#data.words[index] = newWord
        this.#data.words[newIndex] = oldWord
    }

    static #upDown(direction) {
        if (this.#data.inputMode === "select") {
            this.select(direction)
        }
        else if (this.#data.inputMode === "move") {
            this.move(this.#data.selected, direction)
            this.select(direction)
        }
    }

    static up() {
        Model.#upDown(-1)
    }

    static down() {
        Model.#upDown(1)
    }
    
    static submit() {
        if ( this.#isAlphabetized( this.#data.words) ) {
            window.alert("You have alphabetized these words correctly.")
        }
        else {
            window.alert("These words are not alphabetized. Please try again.")
        }
    }

    // backend functions

    static #isAlphabetized(wordList) {
        let alphabetized = Array.from(wordList)
        alphabetized.sort()
        // check if the words at each index are equal
        if ( wordList.length == alphabetized.length ) {
            for (let i=0; i<wordList.length; i++) {
                if ( wordList[i] != alphabetized[i] ) {
                    return false
                }
            }
            return true
        }
        else {
            // unequal lengths, not equal
            return false
        }
    }

    static #initializeDictionary () {
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
        for (let i=0; i<this.#numberOfShuffles; i++) {
            let randomIndex = Math.floor( Math.random()*words.length )
            let nextIndex = (randomIndex + 1) % words.length
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
        this.#data.inputMode = "select"
        // reset currently-selected word
        this.#data.selected = 0
        // get a new list of words
        this.#data.words = this.getNewWords(this.#numberOfWords)
        // increment the current condition
        this.#currentCondition++
    }

    // conditions

    static randomizeKeyboardShortcutsEnabled(odds) {
        let die = Math.random()
        if ( die < odds ) {
            return true
        }
        else {
            return false
        }
    }

    static initializeConditions() {
        let conditionA = new Condition()
        conditionA.conditionName = "small button, small margin"
        conditionA.marginBottom = this.#smallMargin
        conditionA.buttonWidth = this.#smallButton
        conditionA.buttonHeight = this.#smallButton
        conditionA.numberOfWords = this.#numberOfWords
        conditionA.numberOfShuffles = this.#numberOfShuffles
        conditionA.keyboardShortcutOdds = this.#keyboardShortcutOdds
        conditionA.keyboardShortcutsEnabled = this.randomizeKeyboardShortcutsEnabled(conditionA.keyboardShortcutOdds)
        this.#conditions[0] = conditionA

        let conditionB = new Condition()
        conditionB.conditionName = "small button, large margin"
        conditionB.marginBottom = this.#largeMargin
        conditionB.buttonWidth = this.#smallButton
        conditionB.buttonHeight = this.#smallButton
        conditionB.numberOfWords = this.#numberOfWords
        conditionB.numberOfShuffles = this.#numberOfShuffles
        conditionB.keyboardShortcutOdds = this.#keyboardShortcutOdds
        conditionB.keyboardShortcutsEnabled = this.randomizeKeyboardShortcutsEnabled(conditionB.keyboardShortcutOdds)
        this.#conditions[1] = conditionB

        let conditionC = new Condition()
        conditionC.conditionName = "large button, small margin"
        conditionC.marginBottom = this.#smallMargin
        conditionC.buttonWidth = this.#largeButton
        conditionC.buttonHeight = this.#largeButton
        conditionC.numberOfWords = this.#numberOfWords
        conditionC.numberOfShuffles = this.#numberOfShuffles
        conditionC.keyboardShortcutOdds = this.#keyboardShortcutOdds
        conditionC.keyboardShortcutsEnabled = this.randomizeKeyboardShortcutsEnabled(conditionC.keyboardShortcutOdds)
        this.#conditions[2] = conditionC

        let conditionD = new Condition()
        conditionD.conditionName = "large button, large margin"
        conditionD.marginBottom = this.#largeMargin
        conditionD.buttonWidth = this.#largeButton
        conditionD.buttonHeight = this.#largeButton
        conditionD.numberOfWords = this.#numberOfWords
        conditionD.numberOfShuffles = this.#numberOfShuffles
        conditionD.keyboardShortcutOdds = this.#keyboardShortcutOdds
        conditionD.keyboardShortcutsEnabled = this.randomizeKeyboardShortcutsEnabled(conditionD.keyboardShortcutOdds)
        this.#conditions[3] = conditionD
    }

    static beginStudy(participantId) {
        console.log("Starting study...")
        this.participant = new Participant()
        this.participant.id = participantId
        this.participant.startTime = new Date()
    }
    
    static getData() {
        return this.#data
    }

    static init() {
        Model.#initializeDictionary()
        Model.nextCondition()
    }

}