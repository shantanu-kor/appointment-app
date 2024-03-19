const UserData = require('../models/user');

exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    UserData.create({
        name, email, phone, date
    })
        .then(result => {
            console.log("USER ADDED!");
            res.json(result.dataValues);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getUsers = (req, res, next) => {
    UserData.findAll()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    UserData.findByPk(id)
        .then(user => {
            console.log(user);
            return user.destroy();
        })
        .then(result => {
            console.log("USER DELETED!");
            res.sendStatus(204).end();
        })
        .catch(err => {
            console.log(err);
        });
}