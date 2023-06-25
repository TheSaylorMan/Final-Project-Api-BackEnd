import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserBasicCredentialsRequestDto } from './models/user-basic-creds.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponseDto } from './models/signin-response.dto';
import { UserBasicCredentialsCreateDto } from './models/user-basic-register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ type: SignInResponseDto })
  @ApiBody({ type: UserBasicCredentialsRequestDto })
  @Post('login')
  async userLoginBasicCredentials(
    @Body() payload: UserBasicCredentialsRequestDto,
  ) {
    return this.authService.userLoginBasicCredentials(payload);
  }

  @ApiBody({ type: UserBasicCredentialsCreateDto })
  @Post('register')
  async userRegisterBasicCredetials(
    @Body() payload: UserBasicCredentialsCreateDto,
  ) {
    return this.authService.userRegisterBasicCredetials(payload);
  } 
}
