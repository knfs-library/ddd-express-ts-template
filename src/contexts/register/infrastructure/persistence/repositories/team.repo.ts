import { Team as TeamORM } from '../../../../../shared/infrastructure/persistence/ORMs/Team';
import { MemberTeamAssoc } from '../../../../../shared/infrastructure/persistence/ORMs/MemberTeamAssoc';
import { Repository } from '../../../../../shared/infrastructure/persistence/repository.abs';

import sequelize from '../../../../../shared/kernel/database';
import { Factory } from '../../../domain/factory';
import { UUID } from 'crypto';
import { Team } from '../../../domain/entities/Team';

class TeamRepository extends Repository<TeamORM> {
	protected _accentor = sequelize.getRepository(TeamORM);
	protected _factory = Factory;

	async findById(id: UUID): Promise<Team | null> {
		const team = await this._accentor.findByPk(id, {
			include: [
				{
					association: 'admin',
					include: [{
						association: 'profile'
					}]
				}
			]
		});

		if (!team) {
			return null;
		}

		const memberCount = await sequelize.getRepository(MemberTeamAssoc).count({
			where: {
				teamId: id
			}
		});

		return this._factory.initTeamAggregate(
			team, memberCount
		);
	}
}

export default TeamRepository;
