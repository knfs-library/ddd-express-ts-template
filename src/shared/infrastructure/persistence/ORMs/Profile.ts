import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	PrimaryKey,
	AllowNull,
	ForeignKey,
	HasOne
} from 'sequelize-typescript';

import { User } from './User';
import { Address } from './Address';
import { UUID } from 'crypto';

@Table({
	tableName: 'profiles',
	timestamps: true,
})
export class Profile extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: UUID;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column({
		field: 'user_id',
		type: DataType.UUID,
		unique: true,
	})
	userId!: UUID;

	@Column(DataType.TEXT)
	avatar?: string;

	@Column({
		field: 'first_name',
		type: DataType.STRING(200),
	})
	firstName!: string;

	@Column({
		field: 'last_name',
		type: DataType.STRING(200),
	})
	lastName!: string;

	@Column({
		type: DataType.DATE
	})
	birthday!: Date;

	@HasOne(() => Address)
	address!: Address;

	@Column({
		field: 'created_at',
		type: DataType.DATE,
	})
	createdAt!: Date;

	@Column({
		field: 'updated_at',
		type: DataType.DATE,
	})
	updatedAt!: Date;
}
