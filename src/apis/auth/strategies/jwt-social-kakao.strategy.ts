import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['profile_nickname'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      email: 'nice@kakao.com',
      name: profile.displayName,
      password: '1234',
      phoneNumber: '2457',
      certifieNumber: '1729',
      termsConditions: true,
      personalInformation: true,
    };
  }
}
