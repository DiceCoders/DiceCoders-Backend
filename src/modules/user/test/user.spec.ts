import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../interfaces';
import { UserService } from '../services';
import { userMock, mockCreateUserParams, updateUser } from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;
  const mock = userMock;
  const mockRepository = {
    findOne: jest.fn().mockReturnValue(mock),
    save: jest.fn().mockReturnValue(mock),
    create: jest.fn().mockReturnValue(mock),
    update: jest.fn().mockReturnValue(updateUser()),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should be create user', async () => {
    const userCreated = service.createUser(mockCreateUserParams);

    expect(mockRepository.create).toBeCalledWith(
      mockCreateUserParams.email,
      mockCreateUserParams.name,
      mockCreateUserParams.password,
    );
    expect(userCreated).resolves.toBe(userMock);
  });
});
