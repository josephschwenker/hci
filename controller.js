// Controller contains events triggered by View
class Controller {

    static init = function(e) {
        console.log("Initializing interface...")
        Model.init()
        View.render( Model.getData() )
    }

}

window.addEventListener("load", Controller.init)