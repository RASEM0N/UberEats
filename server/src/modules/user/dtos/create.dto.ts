import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreDto } from '@/common/dtos/core.dto';
import type { CoreOutputWithData } from '@/common/dtos/core.dto';

@ObjectType()
export class CreateUserData {
	@Field(() => User)
	user: User;
}

@ArgsType()
export class CreateUserDto extends PickType(User, ['email', 'password', 'role']) {}

@ObjectType()
export class CreateUserOutput
	extends CoreDto
	implements CoreOutputWithData<CreateUserData>
{
	@Field(() => CreateUserData, { nullable: true })
	data?: CreateUserData;
}
