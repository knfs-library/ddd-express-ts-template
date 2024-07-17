interface DatabaseConfig {
	username: string;
	password: string;
	database: string;
	host: string;
	port: number;
	dialect: string;
	dialectOptions: {
		bigNumberStrings: boolean;
	};
	options: {
		benchmark: boolean;
		pool: {
			max: number;
			min: number;
			idle: number;
			acquire: number;
			evict: number;
		};
		timezone: string;
	};
}

interface DatabaseTestConfig {
	dialect: string,
	storage: string,
}


declare const config: {
	environment: string
	development: DatabaseConfig;
	test: DatabaseTestConfig
};

export default config;
