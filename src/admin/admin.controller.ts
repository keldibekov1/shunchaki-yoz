import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { OwnerGuard } from 'src/guard/owner.guard';
  
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // @UseGuards(JwtAuthGuard,OwnerGuard )
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard,OwnerGuard )
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  @UseGuards(JwtAuthGuard,OwnerGuard )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @UseGuards(JwtAuthGuard,OwnerGuard )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard,OwnerGuard )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}