import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { Role } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: CacheService,
  ) { }
  private async invalidateUserCache(userId?: string) {
    await this.cache.resetNamespace('users:all');

    if (userId) {
      await this.cache.resetNamespace(`user:profile:${userId}`);
    }
  }
  async getProfile(userId: string) {
    const cacheKey = this.cache.buildKey(`user:profile:`, userId);

    return this.cache.wrap(
      cacheKey,
      async () => {
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
          include: { tasks: true },
        });
        if (!user) {
          throw new NotFoundException(`User not found`);
        }
        const { password, ...sanitizedUser } = user;

        return { profile: sanitizedUser };
      },
      60 * 1000,
    );
  }
  async deleteUserAccount(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deleted_user = this.prisma.user.delete({ where: { id: userId } });
    await this.invalidateUserCache(userId);
    return deleted_user;
  }

  async allUsers() {
    const cacheKey = this.cache.buildKey('users:', 'all');
    return this.cache.wrap(
      cacheKey,
      async () => {
        const users = await this.prisma.user.findMany();
        return users;
      },
      5 * 60 * 1000,
    );
  }

  async changeRole(userId: string, role: Role) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated_user = await this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    await this.invalidateUserCache(userId);

    return { message: 'Role changed successfully', updated_user };
  }
}
