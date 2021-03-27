let Model = {

    dictionary: [],

    initializeDictionary: function() {
        this.dictionary = dictionaryString.split("\n")
    },

    numberOfRandomWords: 20,

    numberOfShuffles: 20,

    placesToShuffle: 2,

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
        // get a random list of words
        for (let i=0; i<n; i++) {
            let randomIndex = Math.round( Math.random()*l )
            newWords.push( this.dictionary[randomIndex] )
        }
        // alphabetize the words
        newWords.sort()

        // select an arbitrary number of random words
        for (let i=0; i<numberOfShuffles; i++) {
            let randomIndex = Math.round( Math.random()*l )
            // then move it forward (modulus) an arbitrary number of times
            // TODO try destructuring assignment?

            return newWords

        }

    }
}