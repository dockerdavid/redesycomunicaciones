import * as joi from 'joi'

import 'dotenv/config'

interface EnvVars {
    DB_HOST: string
    DB_USER: string
    DB_PASS: string
    DB_PORT: number
    DB_NAME: string
    JWT_SECRET: string
}
const envSchema = joi.object({
    DB_HOST: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value

export default envVars