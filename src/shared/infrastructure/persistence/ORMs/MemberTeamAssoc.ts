import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey
} from 'sequelize-typescript';
import { User } from './User';
import { Team } from './Team';
import { UUID } from 'crypto';

@Table({
	tableName: 'members_teams_associations',
	timestamps: false,
})
export class MemberTeamAssoc extends Model {
	@ForeignKey(() => User)
	@Column({
		field: 'member_id',
		type: DataType.UUID
	})
	memberId!: UUID;

	@ForeignKey(() => Team)
	@Column({
		field: 'team_id',
		type: DataType.UUID
	})
	teamId!: UUID;
}
