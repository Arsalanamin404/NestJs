import KeyvRedis from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redisUrl = config.getOrThrow<string>('REDIS_URL');
        console.log('REDIS_URL at runtime:', redisUrl);
        return {
          stores: [new KeyvRedis(redisUrl)],
          ttl: 5 * 60 * 1000, // default TTL = 5 minutes
        };
      },
    }),
  ],

  providers: [
    CacheService,
    {
      // this is because we are separately using the redis IO also,
      // in order to use and implement reset_namespace functionality
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redisUrl = config.getOrThrow<string>('REDIS_URL');
        return new Redis(redisUrl);
      },
    },
  ],
  exports: [CacheModule, CacheService, 'REDIS_CLIENT'],
})
export class CacheConfigModule { }
