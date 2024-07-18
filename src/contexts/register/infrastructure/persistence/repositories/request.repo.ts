import { Repository } from '../../../../../shared/infrastructure/persistence/repository.abs';

import sequelize from '../../../../../shared/kernel/database';
import { Factory } from '../../../domain/factory';
import { Request as RequestORM } from '../../../../../shared/infrastructure/persistence/ORMs/Request';
import { Team } from '../../../domain/entities/Team';
import { Register } from '../../../domain/entities/Register';
import { Request } from '../../../domain/entities/Request';
import { MemberTeamAssoc } from '../../../../../shared/infrastructure/persistence/ORMs/MemberTeamAssoc';

import { UUID } from 'crypto';

class RequestRepository extends Repository<RequestORM> {
	protected _accentor = sequelize.getRepository(RequestORM)
	protected _factory = Factory;

	async findById(id: UUID): Promise<Request | null> {
		const request = await this._accentor.findByPk(id, {
			include: [
				{
					association: 'register',
					include: [{
						association: 'profile',
						include: [{
							association: 'address'
						}]
					}],
				}, {
					association: 'team',
					attributes: [

					],
					include: [
						{
							association: 'admin',
							include: [{
								association: 'profile'
							}]
						}
					]
				}
			]
		});

		if (null === request) {
			return null
		}
		const memberCount = await sequelize.getRepository(MemberTeamAssoc).count({
			where: {
				teamId: request.team.id
			}
		});

		return this._factory.initRequestAggregate(request, memberCount)
	}
	async create(register: Register, team: Team): Promise<Request | boolean> {
		const created = await this._accentor.create({
			registerId: register.id,
			teamId: team.id
		})

		if (!created) {
			return false
		}

		return this._factory.initRequest(created)
	}
	async updateState(request: Request): Promise<[number]> {
		return await this._accentor.update({
			state: request.dto().state
		}, {
			where: {
				id: request.id
			}
		})

	}
}

export default RequestRepository;
