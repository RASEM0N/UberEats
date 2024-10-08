import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';

@ObjectType()
export class CreateUserData {
	@Field(() => User)
	user: User;
}

@ArgsType()
export class CreateUserArgs extends PickType(User, ['email', 'password', 'role']) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput<CreateUserData> {
	@Field(() => CreateUserData, { nullable: true })
	data?: CreateUserData;
}
