import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateResquest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateResquest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if (!user) {
      throw new Error("Email/Password incorrect")
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    const token = sign({
      email: user.email,
    }, "c965492a50b519451be98427ea60397b", {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService }