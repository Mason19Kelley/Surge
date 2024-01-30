import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PostmarkService } from 'src/postmark/postmark.service';
import { Mail } from 'src/postmark/mail.model'
// auth business logic service
@Injectable()
export class AuthService {
  saltRounds = 10; // don't change
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: PostmarkService
    ) {}

    // validates user login
    // used by auth guard
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(email);
    const hashedPassMatches = await bcrypt.compare(pass, user.password);
    if (user && hashedPassMatches) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // generates auth token in login endpoint
  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async requestResetPassword(email: string) {
    const user = await this.usersService.findUser(email);
    console.log(user)
    if (!user) {
      return
    }
 
    const bcryptSalt = 10;
    // generate token, encrypt it and save to user table.
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    user.resetPasswordToken = hash;
    user.resetPasswordExpires = new Date();
    try {
      await this.usersService.saveUserEntity(user);
      const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&userId=${user.id}`;
      console.log(link)
      // create email template for sendgrid client
      const mail: Mail = {
        From: "mkk020@latech.edu", 
        To: email,
        Subject: "Surge Password Reset Request",
        TextBody: `Hello ${user.fullName}`,
        HtmlBody: `<p>Hello ${user.fullName},</p> 
        <p>You requested to reset your password </p>
        <p>Please, click the link below to reset your Password</p>
        <a href="${link}" target="_blank">Reset Password</p>
        `,
        MessageStream: "reset-password"
      };
      console.log(mail)
      // call sendgridClient after user email validation.
      await this.emailService.sendEmail(mail);
      return link;
    } catch (error) {
      console.log(error)
    }
  }

  

}