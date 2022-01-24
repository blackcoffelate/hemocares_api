 const joi = require("joi");
 const { requestResponse } = require("../utils");

 function validateExpres (scheme) {
     return async (req, res, next) => {
         let response;

         try {
             await scheme.validateAsync(req.body, { abortEarly: false });
             next();
         } catch (error) {
             response = { ...requestResponse.incomplete_body };
             if (error instanceof joi.ValidationError) {
                 response = { ...response, data: { path: errors } };
                 response.message = "INVALID PATTERN FOR VALIDATION";
             }

             return res.status(response.code).json(response);
         }
     };
 }

 function validate (field, scheme) {
     return scheme.validateAsync(field, { abortEarly: false });
 }

 module.exports = {
     validateExpres,
     validate
 };