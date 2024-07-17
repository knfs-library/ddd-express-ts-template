import 'dotenv/config'; 
require('dotenv').config({ path: '.env.test' });
import http from 'http';
import sequelize from '../../src/shared/kernel/database'; // Import sequelize instance


beforeAll(async () => {
	await sequelize.sync({ force: true });
});

afterAll(async () => {
	await sequelize.close();
});
