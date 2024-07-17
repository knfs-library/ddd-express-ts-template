import supertest from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/shared/kernel/database'; // Import sequelize instance
import { User } from '../../src/shared/infrastructure/persistence/ORMs/User';
import { Team } from '../../src/shared/infrastructure/persistence/ORMs/Team';
import { Profile } from '../../src/shared/infrastructure/persistence/ORMs/Profile';
import { MemberTeamAssoc } from '../../src/shared/infrastructure/persistence/ORMs/MemberTeamAssoc';
import { Address } from '../../src/shared/infrastructure/persistence/ORMs/Address';
import { Request } from '../../src/shared/infrastructure/persistence/ORMs/Request';

async function seedTestData() {
	const user1 = await sequelize.getRepository(User).create({
		username: 'user1',
		email: 'user1@example.com',
		password: 'password1',
	});

	const user2 = await sequelize.getRepository(User).create({
		username: 'user2',
		email: 'user2@example.com',
		password: 'password2',
	});

	// Tạo profiles
	await sequelize.getRepository(Profile).create({
		userId: user1.id,
		firstName: 'First1',
		lastName: 'Last1',
	});

	const profile2 = await sequelize.getRepository(Profile).create({
		userId: user2.id,
		firstName: 'First1',
		lastName: 'Last1',
		birthday: new Date(),
	});

	await sequelize.getRepository(Address).create({
		profileId: profile2.id,
		address: 'address',
		ward: 'ward',
		district: 'district',
		city: 'city',
		country: 'country',
	});
	

	const team1 = await sequelize.getRepository(Team).create({
		adminId: user1.id,
		name: 'Team 1',
		description: 'Description for Team 1',
	});

	await sequelize.getRepository(MemberTeamAssoc).create({
		memberId: user1.id,
		teamId: team1.id,
	});

	return {
		register: user2,
		team: team1,
		admin: user1
	}
}

describe('Registration Endpoints', () => {
	let seedData: any
	let request: any;
	beforeAll(async () => {
		seedData = await seedTestData()
		request = supertest(app);
	});
	it('should register a user to a team', async () => {
		const registerId = seedData.register.id;
		const teamId = seedData.team.id;
		const registerRequest = request.post('/api/registers')
		const res = await registerRequest.send({ registerId, teamId });

		expect(res.status).toEqual(200);
		expect(res.body.content).toEqual('ok');
		expect(res.body.request).toBeDefined();

		const requestValue = await sequelize.getRepository(Request).findByPk(res.body.request.id);
		expect(requestValue).not.toBeNull()

	}, 10000);
	it('should approved a user to a team', async () => {
		const adminId = seedData.admin.id;
		const registerId = seedData.register.id;
		const teamId = seedData.team.id;

		const registerRequest = request.post('/api/registers')
		const registerRes = await registerRequest.send({ registerId, teamId });
		const requestId = registerRes.body.request.id
		
		const approveRequest = request.post('/api/registers/approve')
		const res = await approveRequest.send({ adminId, requestId })
		expect(res.status).toEqual(200);
		expect(res.body.content).toEqual('ok');
		expect(res.body.request).toBeDefined();
		expect(res.body.request.state).toEqual(1);


	}, 10000);

});
