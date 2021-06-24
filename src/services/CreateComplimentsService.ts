
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentsService {
  tag_id: string,
  user_sender: string,
  user_receiver: string,
  message: string
}

class CreateComplimentsService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentsService) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver");
    }

    const userRepositories = getCustomRepository(UsersRepositories);

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentsRepositories.save(compliment);

    return compliment;

  }
}

export { CreateComplimentsService }