import sequelize from './shared/kernel/database';

import app from './app' 
const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		sequelize.sync({ force: false }).then(() => {
			console.log('Database synchronized');
		}).catch(err => {
			console.error('Error synchronizing database:', err);
		});
		// Initialize users or other models here if needed

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

bootstrap();


