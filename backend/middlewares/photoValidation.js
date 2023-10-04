const {body} = require("express-validator")

const photoInsertValidation = () =>{
    return [
    body("title")
        .not()
        .equals("undefined")
        .withMessage("O titulo é o obrigatorio")
        .isString()
        .withMessage("O titulo é o obrigatorio")
        .isLength({min: 3})
        .withMessage("O titulo precisa ter no mínimo 3 caracteres."),
    body("image").custom((value, {req}) => {
        if(!req.file){
            throw new Error("A imagem é obrigatoria.")
        }
        return true
    })
    ]
}

const photoUpdateValidation = () =>{
    return [
        body("title")
        .isString()
        .withMessage("O título é obrigatório.")
        .isLength({min: 3})
        .withMessage("O titulo precisa ter no mínimo 3 caracteres."),
    ]
}

const comentValidation = () => {
    return [
        body("comment")
        .isString()
        .withMessage("O comentário é obrigatório.")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    comentValidation
}