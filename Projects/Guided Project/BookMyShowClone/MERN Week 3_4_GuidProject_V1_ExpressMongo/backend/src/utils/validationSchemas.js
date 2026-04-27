const Joi = require("joi");
/*
-----------------------------------------
REGISTER VALIDATION
-----------------------------------------
*/
exports.registerSchema = Joi.object({
name: Joi.string().required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required(),
});
/*
-----------------------------------------
LOGIN VALIDATION
-----------------------------------------
*/
exports.loginSchema = Joi.object({
email: Joi.string().email().required(),
password: Joi.string().required(),
});
/*
-----------------------------------------
CREATE MOVIE
-----------------------------------------
*/
exports.movieSchema = Joi.object({
title: Joi.string().required(),

genre: Joi.string().required(),
rating: Joi.number().min(1).max(5).required(),
duration: Joi.number().required(),
releaseDate: Joi.date().required(),
});