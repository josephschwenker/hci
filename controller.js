// Controller contains events triggered by View
class Controller {

    static init = function(e) {
        Model.init()
        View.render( Model.getData() )
    }

    // researcher input
    static beginStudy = function(e) {
        e.preventDefault()
        let participantId = document.getElementById("participantId").value
        if ( participantId.length >= 0 && Number(participantId) != NaN ) {
            Model.beginStudy(participantId)
            View.render( Model.getData() )
        }
    }

    // alphabetization task

    static up = function(e) {
        Model.up()
        View.render( Model.getData() )
    }

    static down = function(e) {
        Model.down()
        View.render( Model.getData() )
    }

    static select = function(e) {
        Model.changeToSelect()
        View.render( Model.getData() )
    }

    static move = function(e) {
        Model.changeToMove()
        View.render( Model.getData() )
    }

    static submit = function(e) {
        Model.submit()
        View.render( Model.getData() )
    }

    static preventDefault = function(e) {
        e.preventDefault()
    }

}

// init events
window.addEventListener("load", Controller.init)

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

// researcher input
document.getElementById("beginStudy").addEventListener("submit", Controller.beginStudy)