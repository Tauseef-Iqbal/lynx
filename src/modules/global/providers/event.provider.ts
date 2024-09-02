import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { UserService } from 'src/modules/user';
import { UserUpdateEvent } from 'src/shared/services';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly userService: UserService,
  ) {}

  @OnEvent('user.updated', { async: true })
  async handleUserUpdateEvent(event: UserUpdateEvent): Promise<void> {
    try {
      const cachedUser: string | undefined = await this.cacheManager.get(`user-${event.userId}`);
      const updatedUser = await this.userService.findById(event.userId);

      if (updatedUser) {
        const mergedUserData = {
          ...(cachedUser ? JSON.parse(cachedUser) : {}),
          ...updatedUser,
          company: { id: updatedUser?.company?.id },
          companyProfile: { id: updatedUser?.companyProfile?.id, name: updatedUser?.companyProfile?.name },
        };

        await this.cacheManager.set(`user-${updatedUser.id}`, JSON.stringify(mergedUserData));
        this.logger.log(`Updated cache for user ${event.userId}`);
      } else {
        this.logger.warn(`User with ID ${event.userId} not found during cache update`);
      }
    } catch (error) {
      this.logger.error(`Failed to update cache for user ${event.userId}`, error.stack);
    }
  }
}
