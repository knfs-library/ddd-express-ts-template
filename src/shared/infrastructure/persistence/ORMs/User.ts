import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	PrimaryKey,
	BelongsToMany,
	HasOne
} from 'sequelize-typescript';

import { MemberTeamAssoc } from './MemberTeamAssoc';
import { Team } from './Team';
import { Profile } from './Profile';
import { UUID } from 'crypto';


@Table({
	tableName: 'users',
	timestamps: true,
})
export class User extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: UUID;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	username!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	email!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password!: string;

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

	@BelongsToMany(() => Team, () => MemberTeamAssoc)
	teams!: Team[];

	@HasOne(() => Profile)
	profile!: Profile

	@HasOne(() => Team, {
		foreignKey: 'adminId'
	})
	adminTeam!: Team;
}
