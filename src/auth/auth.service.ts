import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBasicCredentialsRequestDto } from './models/user-basic-creds.dto';
import { SignInResponseDto } from './models/signin-response.dto';
import { UserBasicCredentialsCreateDto } from './models/user-basic-register.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async userLoginBasicCredentials({
    email,
    password,
  }: UserBasicCredentialsRequestDto): Promise<any> {
    const credentials =
      await this.prismaService.userBasicCredentials.findUnique({
        where: {
          email: email,
        },
      });

    if (!credentials) {
      throw new BadRequestException(
        'No account created with this email address.',
      );
    }

    const isPasswordValid = await compare(password, credentials.password);

    if (!isPasswordValid) {
      throw new BadRequestException('The inserted credentials are not valid.');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: credentials.userId,
      },
    });

    return this.signInAsync(user);
  }

  async userRegisterBasicCredetials(payload: UserBasicCredentialsCreateDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: payload.email,
      },
      include: {
        basicCredentials: true,
      },
    });

    if (user && user.basicCredentials) {
      throw new BadRequestException(
        'An account with this email is already registered',
      );
    }

    const salt = 10;
    const passwordHash = await hash(payload.password, salt);

    await this.prismaService.user.create({
      data: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        basicCredentials: {
          create: {
            email: payload.email,
            password: passwordHash,
          },
        },
      },
    });
    const message = {
      to: payload.email,
      
    }
  }

  private signInAsync(user: User): SignInResponseDto {
    return {
      access_token: this.jwtService.sign({
        userId: user.id,
        expiresIn: '8h',
      }),
    };
  }

  async getUserByIdAsync(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
  }
}
