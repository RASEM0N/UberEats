import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailerService } from '@/modules/mailer/mailer.service';
import { UsersService } from '../../users.service';
import { UsersVerifyService } from '../../users-verify.service';
import { User } from '../../entities/user.entity';
import { Verification } from '../../entities/verification.entity';
import { createMockRepository } from '@/shared/lib/tests/mock-repository';
import { DataSource } from 'typeorm';
import {
	createMockDataSource,
	MockDataSource,
} from '@/shared/lib/tests/mock-data-source';
import { MockComponent } from '@/shared/lib/tests/mock-component';

export interface TestingModuleParams {
	usersService?: MockComponent<UsersService>;
	usersVerifyService?: MockComponent<UsersVerifyService>;
}

export const testingModule = async ({
	usersService,
	usersVerifyService,
}: TestingModuleParams) => {
	const module = await Test.createTestingModule({
		providers: [
			{
				provide: UsersService,
				useValue: usersService ?? UsersService,
			},
			{
				provide: UsersVerifyService,
				useValue: usersVerifyService ?? UsersVerifyService,
			},
			{
				provide: getRepositoryToken(User),
				useValue: createMockRepository(),
			},
			{
				provide: getRepositoryToken(Verification),
				useValue: createMockRepository(),
			},
			{
				provide: MailerService,
				useValue: {
					sendEmail: jest.fn(),
				},
			},
			{
				provide: DataSource,
				useValue: createMockDataSource(),
			},
		],
	}).compile();

	return {
		userService: module.get<UsersService | MockComponent<UsersService>>(UsersService),
		usersVerifyService: module.get<
			UsersVerifyService | MockComponent<UsersVerifyService>
		>(UsersVerifyService),
		userRepository: module.get(getRepositoryToken(User)),
		userVerifyRepository: module.get(getRepositoryToken(Verification)),
		mailerService: module.get(MailerService),
		dataSource: module.get<MockDataSource>(DataSource),
	};
};
