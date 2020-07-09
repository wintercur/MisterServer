var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.post('/notes/read', (req, res) => {
        const id = req.body.id;
        const details = {
            '_id': ObjectID(id)
        };
        //POST n GET!!!
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(item);
            }
        });
    });
    app.get('/all', (req, res) => {
        let coll = db.collection('notes');
        db.collection('notes').find({}).toArray(function (err, result) {
            if (err) {
                console.log('WTF ERROR???', err)
                res.send({
                    'error': 'An error has occurred'
                });
            } else {

                console.log('result:', result)
                coll.countDocuments().then((count) => {
                    console.log('elements in array: ' + count);
                });
                console.time()
                res.send(result);
                console.timeEnd()
            }
        });
    });

    app.post('/notes/add', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.post('/notes/update', (req, res) => {
        const id = req.body.id;
        const details = {
            '_id': ObjectID(id)
        };
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(note);
            }
        });
    });
    app.post('/notes/delete', (req, res) => {
        const id = req.body.id;
        const details = {
            '_id': ObjectID(id)
        };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send('Note deleted!');
            }
        });
    });
};