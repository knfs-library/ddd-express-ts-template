import { UUID } from 'crypto';
import { RegisterAggregate } from '../aggregate';

interface IRegisterRepository {
	findById(id: UUID): Promise<RegisterAggregate | null>
}

export default IRegisterRepository;
