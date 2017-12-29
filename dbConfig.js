exports.config = {
  userName: 'flrdev2016',
  password: 'kC4!@uJTfC',
  server: 'find-local-rentals-api.database.windows.net',
  options: {
    database: 'find-local-rentals',
    encrypt: true,
    rowCollectionOnRequestCompletion: true
  }
}
exports.use_env_variable = true;
exports.sequelizeConfig = {
  development: {
    username: "flrdev2016",
    password: "kC4!@uJTfC",
    database: "find-local-rentals",
    host: "find-local-rentals-api.database.windows.net",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true
    },
    operatorsAliases: true
  },
  test: {
    username: "flrdev2016",
    password: "kC4!@uJTfC",
    database: "find-local-rentals",
    host: "find-local-rentals-api.database.windows.net",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true
    },
    operatorsAliases: true
  },
  production: {
    username: "flrdev2016",
    password: "kC4!@uJTfC",
    database: "find-local-rentals",
    host: "find-local-rentals-api.database.windows.net",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true
    },
    operatorsAliases: true
  }
}