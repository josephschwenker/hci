let Model = {

    dictionary: [],

    initializeDictionary: function() {
        this.dictionary = dictionaryString.split("\n")
    },

    numberOfRandomWords: 20,

    currentWords: [],

    currentlySelected: undefined,

    state: "inactive",

    states: ["inactive", "select", "move"],

    actions: {

        changeMode: function(newMode) {

        },
        select: function(index) {

        },
        move: function(originalPosition, newPosition) {

        },
        submit: function() {

        }

    },

    getNewWords: function(n) {
        let l = this.dictionary.length
        let newWords = []
        for (let i=0; i<n; i++) {
            let randomIndex = Math.round( Math.random()*l )
            newWords.push( this.dictionary[randomIndex] )
        }
        return newWords
    }
}