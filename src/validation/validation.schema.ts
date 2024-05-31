import Joi from "joi";

const createUserSchema = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("password"),
    type: Joi.string().required().label("User type")
})

export default createUserSchema;