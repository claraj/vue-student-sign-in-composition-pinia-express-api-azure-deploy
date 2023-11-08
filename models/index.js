const { Sequelize, DataTypes } = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student')

const env = process.env.NODE_ENV || 'development'

const dbPassword = process.env.DB_PASSWORD

const config = configJson[env]
config.password = dbPassword

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize,
    Sequelize: Sequelize,
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name 
database[studentModelName] = studentModel

module.exports = database 


