class Model {

    dictionary = []

    static initializeDictionary () {
        this.dictionary = dictionaryString.split("\n")
    }

    static numberOfRandomWords = 20

    static numberOfShuffles = 20

    static currentWords = []

    static currentlySelected = undefined

    static state = "select"

    static states = ["select", "move"]

    static actions = {

        changeMode: function(newMode) {

        },
        select: function(index) {

        },
        move: function(originalPosition, newPosition) {

        },
        submit: function() {

        }

    }

    static getNewWords(n) {
        let length = this.dictionary.length
        let newWords = []
        // get a random list of words
        for (let i=0; i<n; i++) {
            let randomIndex = Math.floor( Math.random()*length )
            newWords.push( this.dictionary[randomIndex] )
        }
        // alphabetize the words
        newWords.sort()

        newWords = this.shuffleWords(newWords)

        return newWords
    }

    static shuffleWords(words) {
        // select an arbitrary number of random words
        console.log("this.numberOfShuffles: " + this.numberOfShuffles)
        for (let i=0; i<this.numberOfShuffles; i++) {
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
}

Model.initializeDictionary()