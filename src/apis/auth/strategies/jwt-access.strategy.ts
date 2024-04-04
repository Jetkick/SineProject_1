import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'userPassword',
    });
  }

  validate(payload) {
    console.log(payload); // { sub: ...(유저ID) }
    return {
      id: payload.sub,
    };
  }
}
