import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { META_KEY as USER_ROLE_KEY } from '../decorators/auth-role.decorator';
import { META_KEY as PUBLIC_KEY } from '../decorators/auth-public.decorator';
import { User, UserRole } from '@/modules/users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
		const roles = this.reflector.get<UserRole[]>(USER_ROLE_KEY, context.getHandler());

		if (isPublic || !roles.length) {
			return true;
		}

		const gqlContext = GqlExecutionContext.create(context).getContext();
		const user: User = gqlContext.user;

		return user && roles.includes(user.role);
	}
}
