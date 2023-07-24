import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';
import { async } from 'rxjs';
import { Public } from 'src/auth/decorators';

interface UpdateRoleData {
  removeRole: string;
  newRole: string;
}



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }


  @Post('/signup')
  async createUser(
    @Res() response: any,
    @Body() user,
  ) {
    return this.userService
      .signup(user)
      .then((newUser) => {
        response.status(HttpStatus.CREATED).json({
          newUser,
          success: true,
        });
      })
      .catch((err: any) => {
        console.error(err);
        if (
          ['MongoError', 'MongoServerError'].includes(err.name) &&
          err.code === 11000
        ) {
          if (err?.keyPattern?.username) {
            // Duplicate username
            return response
              .status(HttpStatus.UNPROCESSABLE_ENTITY)
              .send({ success: false, message: 'Username already exist!' });
          }
          if (err?.keyPattern?.email) {
            // Duplicate username
            return response
              .status(HttpStatus.UNPROCESSABLE_ENTITY)
              .send({ success: false, message: 'Email already exist!' });
          }
        }
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send({ ...err, message: err.message, success: false });
      });
  }

  @Get()
  async getUsers(@Res() res: any, @Req() req: any) {
    await this.userService.findAll().then((data) => {
      console.log(req.user);

      return res.status(HttpStatus.OK).json({ success: true, data })
    });

  }

}