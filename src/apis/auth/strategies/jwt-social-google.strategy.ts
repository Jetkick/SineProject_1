import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '514797503218-t3u3cn6h6o9urd5bh6phu4iv3dbnkv2n.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      password: 'tooil10',
      phoneNumber: '1729',
      certifieNumber: '1729',
      termsConditions: true,
      personalInformation: true,
    };
  }
}
