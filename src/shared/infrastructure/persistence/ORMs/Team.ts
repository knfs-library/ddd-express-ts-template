import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	PrimaryKey,
	AllowNull,
	BelongsToMany,
	BelongsTo
} from 'sequelize-typescript';

import { MemberTeamAssoc } from './MemberTeamAssoc';
import { User } from './User';
import { UUID } from 'crypto';

@Table({
	tableName: 'teams',
	timestamps: true,
})
export class Team extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: UUID;

	@AllowNull(false)
	@Column({
		field: 'admin_id',
		type: DataType.UUID,
	})
	adminId!: UUID;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name!: string;


	@Column(DataType.TEXT)
	description?: string;

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

	@BelongsToMany(() => User, () => MemberTeamAssoc)
	members!: User[];

	@BelongsTo(() => User, {
		foreignKey: 'adminId',
		targetKey: 'id',
		as: 'admin'
	})
	admin!: User;
}
