import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET')
    });
  }

  async validate(payload: {email:string,sub:number}) {

    const user = await this.prisma.user.findUnique({
        where:{
            id:payload.sub
        }
    })
    delete user.password
    return user;
  }
}