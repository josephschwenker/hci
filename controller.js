// Controller contains events triggered by View
class Controller {

    static init(e) {
        Model.init()
        View.render( Model.getData() )
    }

    static beforeUnload(e) {
        return "Please do not use your browser's navigation buttons during the study."
    }

    // researcher input
    static beginStudy(e) {
        e.preventDefault()
        let participantId = document.getElementById("participantId").value
        if ( participantId.length >= 0 && Number(participantId) != NaN ) {
            Model.beginStudy(participantId)
            View.render( Model.getData() )
        }
    }

    // general screen

    static nextScreen(e) {
        Model.nextScreen()
        View.render( Model.getData() )
    }

    // survey

    static surveyNext(e) {
        e.preventDefault()
        let stress = document.getElementsByName("stress")
        let ease = document.getElementsByName("ease")
        let strain = document.getElementsByName("ease")
        let comfort = document.getElementsByName("comfort")
        let fatigue = document.getElementsByName("fatigue")
        let alertness = document.getElementsByName("alertness")
        let openEnded = document.getElementById("openEnded")

        function getResponse(question) {
            for (let e of question) {
                if (e.checked) {
                    return Number(e.value)
                }
            }
            return "no response"
        }

        let surveyData = {
            stress: getResponse(stress),
            ease: getResponse(ease),
            strain: getResponse(strain),
            comfort: getResponse(strain),
            fatigue: getResponse(fatigue),
            alertness: getResponse(alertness),
            openEnded: openEnded.value,
        }

        Model.surveyNext(surveyData)
        View.resetForms()
        View.render( Model.getData() )
    }

    static demographicSurveyNext(e) {
        e.preventDefault()
        let data = {
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
        }

        Model.demographicSurveyNext(data)

        let surveyNext = document.getElementById("surveyNext")

        // check if this was the last screen
         let isLastScreen = surveyNext.getAttribute("data-isLastScreen")
         if ( isLastScreen == "true" ) {
             // generate a download link
             let data = "data:text/json;charset=utf-8," + encodeURIComponent( Model.export() )
             let e = document.getElementById("export")
             e.setAttribute("href", data)
             e.setAttribute("download", "participant.json")
             e.click()
         }

         View.render( Model.getData() )
        
    }

    // alphabetization task

    static up(e) {
        Model.up()
        View.render( Model.getData() )
    }

    static down(e) {
        Model.down()
        View.render( Model.getData() )
    }

    static select(e) {
        Model.changeToSelect()
        View.render( Model.getData() )
    }

    static move(e) {
        Model.changeToMove()
        View.render( Model.getData() )
    }

    static submit(e) {
        Model.submit()
        View.render( Model.getData() )
    }

    static preventDefault(e) {
        e.preventDefault()
    }

    static keypress(e) {
        // only process keypress events on a task screen
        if ( Model.getData().screen == "alphabetizationTask" || Model.getData().screen == "training" ) {
            // ignore repeated keypresses (from holding the key down)
            if (!e.repeat) {
                Model.keydown(e.code)
                View.render( Model.getData() )
            }
        }
    }
}

// disable context menu
window.addEventListener( "contextmenu", e => e.preventDefault() )

// init events
window.addEventListener("load", Controller.init)

// disable back button
window.onbeforeunload = Controller.beforeUnload

// alphabetization task
// button click events
document.getElementById("select").addEventListener("click", Controller.select)
document.getElementById("move").addEventListener("click", Controller.move)
document.getElementById("up").addEventListener("click", Controller.up)
document.getElementById("down").addEventListener("click", Controller.down)
document.getElementById("submit").addEventListener("click", Controller.submit)
// disable keyboard
document.getElementById("select").addEventListener("keydown", Controller.preventDefault)
document.getElementById("move").addEventListener("keydown", Controller.preventDefault)
document.getElementById("up").addEventListener("keydown", Controller.preventDefault)
document.getElementById("down").addEventListener("keydown", Controller.preventDefault)
document.getElementById("submit").addEventListener("keydown", Controller.preventDefault)

// keyboard shortcuts
window.addEventListener("keydown", Controller.keypress)

// researcher input
document.getElementById("beginStudy").addEventListener("submit", Controller.beginStudy)

// general instructions
document.getElementById("generalInstructionsNext").addEventListener("click", Controller.nextScreen)

// training instructions
document.getElementById("trainingNoKeyboardNext").addEventListener("click", Controller.nextScreen)
document.getElementById("trainingKeyboardNext").addEventListener("click", Controller.nextScreen)

// training debrief
document.getElementById("trainingDebriefNext").addEventListener("click", Controller.nextScreen)

// no keyboard shortcuts preview
document.getElementById("noKeyboardShortcutsNext").addEventListener("click", Controller.nextScreen)

// keyboard shortcuts enabled preview
document.getElementById("keyboardShortcutsNext").addEventListener("click", Controller.nextScreen)

// survey next
document.getElementById("surveyForm").addEventListener("submit", Controller.surveyNext)

// demographic survey next
document.getElementById("demographicSurveyForm").addEventListener("submit", Controller.demographicSurveyNext)