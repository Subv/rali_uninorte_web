module.exports = function(app, firebase) {
    app.get('/places', function(req, res) {
        var db = admin.database();
        var ref = db.ref("/places");
        ref.once("value", function(snapshot) {
            context = {
                places: snapshot.val()
            };
            res.render("places", context);
        });
    });

    app.get('/add_place', function(req, res) {
        res.render("add_place");
    });

    app.post('/add_place_handler', function(req, res) {
        var db = admin.database();
        var ref = db.ref("/places");
        var opts = req.body.opciones;

        ref.push({
            descriptionPlace: req.body.descripcion,
            textPlace: req.body.texto,
            idBeacon: req.body.id_beacon,
            questionPlace: req.body.pregunta,
            answerCorrect: req.body.respuesta_ok,
            answersPlace: opts
        });
        res.redirect("/places");
    });

    app.get('/delete_place/:place', function(req, res) {
        var place = req.params.place;
        var db = admin.database();
        var ref = db.ref("/places/" + place);
        ref.remove();
        console.log("Removed " + place);
        res.redirect("/places");
    });

    app.get('/reports', function(req, res) {
        var db = admin.database();
        var ref = db.ref("/reports");
        ref.once("value", function(snapshot) {
            context = {
                reports: snapshot.val()
            };
            res.render("reports", context);
        });
    });

    app.get('*', function(req, res) {
        res.redirect("/places");
    });
};