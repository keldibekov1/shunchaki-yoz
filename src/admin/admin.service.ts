import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}




  async create(data: CreateAdminDto) {
    const existing = await this.prisma.admin.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('Bu admin allaqachon mavjud');
    }

    const hashPswrd = await bcrypt.hash(data.password, 10);

    return this.prisma.admin.create({
      data: {
        ...data,
        password: hashPswrd,
        role: Role.ADMIN,
      },
    });
  }

  async findAll() {
    return await this.prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
  }

  async findOne(id: string) {
    let admin = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });
    if (!admin) {
      throw new NotFoundException('Bunday admin yoq');
    }
    return admin;
  }

async update(id: string, data: UpdateAdminDto) {
  const updateAdmin = await this.prisma.admin.findUnique({ where: { id } });

  if (!updateAdmin) {
    throw new NotFoundException('Bunday admin yoq');
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 7);
  }

  return await this.prisma.admin.update({
    where: { id },
    data,
    select: {
      id: true,
      role: true,
      },
  });
}


  async remove(id: string) {
    let deleteUser = await this.prisma.admin.findUnique({ where: { id } });
    if (!deleteUser) {
      throw new NotFoundException('Bunday admin yoq');
    }
    return deleteUser;
  }


}