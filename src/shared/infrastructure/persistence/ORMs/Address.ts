import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	PrimaryKey,
	AllowNull,
	ForeignKey
} from 'sequelize-typescript';

import { Profile } from './Profile';
import { UUID } from 'crypto';

@Table({
	tableName: 'addresses',
	timestamps: true,
})
export class Address extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: UUID;

	@AllowNull(false)
	@ForeignKey(() => Profile)
	@Column({
		field: 'profile_id',
		type: DataType.UUID,
		unique: true,
	})
	profileId!: UUID;

	@Column({
		type: DataType.STRING(200),
		allowNull: false,
	})
	address!: string;

	@Column({
		type: DataType.STRING(200),
		allowNull: false,
	})
	ward!: string;

	@Column({
		type: DataType.STRING(200),
		allowNull: false,
	})
	district!: string;

	@Column({
		type: DataType.STRING(200),
		allowNull: false,
	})
	city!: string;

	@Column({
		type: DataType.STRING(200),
		allowNull: false,
	})
	country!: string;

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
