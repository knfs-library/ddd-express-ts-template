import { UUID } from 'crypto';
import { RegisterAggregate } from '@/contexts/register/domain/aggregate';

interface IRegisterRepository {
	findById(id: UUID): Promise<RegisterAggregate | null>
}

export default IRegisterRepository;
