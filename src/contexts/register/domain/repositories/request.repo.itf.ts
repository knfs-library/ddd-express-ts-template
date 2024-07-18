
import { Team } from '../entities/Team';
import { Register } from '../entities/Register';
import { Request } from '../entities/Request';
import { RequestAggregate } from '../aggregate';

import { UUID } from 'crypto';

interface IRequestRepository {
	findById(id: UUID): Promise<RequestAggregate | null> 
	create(register: Register, team: Team): Promise<Request | boolean> 
	updateState(request: Request): Promise<[number]> 
}

export default IRequestRepository;
