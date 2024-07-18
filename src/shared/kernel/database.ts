import { Sequelize } from 'sequelize-typescript';
import config from '../configs/database/database.config'

let sequelize: Sequelize;
if (config.environment === 'test') {
	sequelize = new Sequelize({
		dialect: config.test.dialect as any,
		logging: async (sql, timing) => {
			console.log('SQL: ' + sql + '\nTiming:' + timing + ' ms')
		},
		models: [__dirname + './../infrastructure/persistence/ORMs'],
		repositoryMode: true,
	});
} else {
	sequelize = new Sequelize({
		database: config.development.database,
		username: config.development.username,
		password: config.development.password,
		host: config.development.host,
		port: config.development.port,
		dialect: config.development.dialect as any,
		dialectOptions: config.development.dialectOptions,
		logging: async (sql, timing) => {
			console.log('SQL: ' + sql + '\nTiming:' + timing + ' ms')
		},
		pool: config.development.options.pool,
		timezone: config.development.options.timezone,
		models: [__dirname + './../infrastructure/persistence/ORMs'],
		repositoryMode: true,
	});
}

export default sequelize
