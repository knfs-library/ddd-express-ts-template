import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	PrimaryKey,
	ForeignKey,
	BelongsTo
} from 'sequelize-typescript';

import { User } from './User';
import { Team } from './Team';
import { UUID } from 'crypto';

@Table({
	tableName: 'requests',
	timestamps: true,
})
export class Request extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: UUID;

	@ForeignKey(() => User)
	@Column({
		field: 'register_id',
		type: DataType.UUID 
	})
	registerId!: UUID;

	@ForeignKey(() => Team)
	@Column({
		field: 'team_id',
		type: DataType.UUID
	})
	teamId!: UUID;

	@Column(DataType.NUMBER)
	state!: number;
	
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

	@BelongsTo(() => User, {
		foreignKey: 'registerId',
		targetKey: 'id',
		as: 'register'
	})
	register!: User

	@BelongsTo(() => Team, {
		foreignKey: 'teamId',
		targetKey: 'id',
		as: 'team'
	})
	team!: Team

	
}
