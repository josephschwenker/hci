class Participant {
    constructor() {
        id = 0
        startTime = 0
        endTime = 0
        totalTime = 0
    }

    getTotalTime() {
        return endTime - startTime
    }
}