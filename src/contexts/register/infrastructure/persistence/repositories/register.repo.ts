import { User } from '../../../../../shared/infrastructure/persistence/ORMs/User';
import { Repository } from '../../../../../shared/infrastructure/persistence/repository.abs';

import sequelize from '../../../../../shared/kernel/database';
import { Factory } from '../../../domain/factory';
import { UUID } from 'crypto';
import { RegisterAggregate } from '../../../domain/aggregate';
import IRegisterRepository from '../../../domain/repositories/register.repo.itf';
class RegisterRepository extends Repository<User> implements IRegisterRepository {
	protected _accentor = sequelize.getRepository(User)
	protected _factory = Factory;

	async findById(id: UUID): Promise<RegisterAggregate | null> {
		const register = await this._accentor.findByPk(id,{
			include: [
				{
					association: 'profile',
					include: [{
						association: 'address'
					}]
				}
			]
		});

		if (null === register) {
			return null
		}
		return this._factory.initRegisterAggregate(register)
	}
}

export default RegisterRepository;
