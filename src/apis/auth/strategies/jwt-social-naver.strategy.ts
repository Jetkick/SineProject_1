import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver-v2';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: '6TPI1dKBTWsGbciQVg5h',
      clientSecret: '7gAoz8Hhds',
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['eamil', 'name'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      email: profile.email,
      name: profile.name,
      password: '1234',
      phoneNumber: '4457',
      certifieNumber: '1729',
      termsConditions: true,
      personalInformation: true,
    };
  }
}
