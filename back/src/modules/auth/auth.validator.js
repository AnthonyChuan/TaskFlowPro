import { body } from "express-validator"

export const validarRegistro=[
    body("nombre").trim().notEmpty().withMessage("El nombre no puede estar vacio"),
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body("password").isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe tener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('Debe tener al menos un número')
]

export const validarLogin=[
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body("password").trim().notEmpty().withMessage("Debe digitar su contraseña")
]