import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('users')
export class UsersController {
  nombreAvatar = '';
  constructor(private userService: UsersService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      //fileFilter: fileExtensionFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          this.nombreAvatar = Date.now() + path.extname(file.originalname)
          cb(null, this.nombreAvatar);
        },
      }),
    }),
  )
  async createUser(
    @Body() user: User,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<void> {
    const profile = new Profile();
    profile.displayName = user.username;
    profile.avatar = avatar.filename;
    await this.userService.createUser(user, profile);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
