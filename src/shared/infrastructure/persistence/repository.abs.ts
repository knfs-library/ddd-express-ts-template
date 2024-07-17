
import { Repository as SequelizeRepository, Model } from 'sequelize-typescript';
import FactoryInterface from '../../domain/factory.itf'

export abstract class Repository<T extends Model> {
	protected abstract _accentor: SequelizeRepository<T>;
	protected abstract _factory: FactoryInterface;
	
}