import { User } from '../../../../../shared/infrastructure/persistence/ORMs/User';
import { Repository } from '../../../../../shared/infrastructure/repository.abs';

import sequelize from '../../../../../shared/kernel/database';
import Factory from '../../../domain/factory';
import { UUID } from 'crypto';
import { Register } from '../../../domain/entities/Register';

class RegisterRepository extends Repository<User> {
	protected _accentor = sequelize.getRepository(User)
	protected _factory = Factory;

	async findById(id: UUID): Promise<Register | null> {
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
		const address = this._factory.initAddress(
			register.profile.address.address,
			register.profile.address.ward,
			register.profile.address.district,
			register.profile.address.city,
			register.profile.address.country,
		)

		return this._factory.initRegister(
			register.id,
			register.profile.firstName,
			register.profile.lastName,
			register.profile.birthday,
			address,
		)
	}
}

export default RegisterRepository;
