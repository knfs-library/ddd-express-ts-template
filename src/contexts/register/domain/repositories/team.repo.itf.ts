import { UUID } from 'crypto';
import { TeamAggregate } from '../aggregate';

interface ITeamRepository {
	findById(id: UUID): Promise<TeamAggregate | null> 
}

export default ITeamRepository;
