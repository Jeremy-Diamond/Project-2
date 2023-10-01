const validator = require('../helpers/validate');

const saveStudent = (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "favoriteClass": "required|string",
        "wandCore": "required|string",
        "wandMaterial": "required|string",
        "birthday": "required|date",
        "hogwartsHouse": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};  

const saveTeacher = (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "class": "required|string",
        "wandCore": "required|string",
        "wandMaterial": "required|string",
        "birthday": "required|date",
        "hogwartsHouse": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveStudent,
    saveTeacher
};
