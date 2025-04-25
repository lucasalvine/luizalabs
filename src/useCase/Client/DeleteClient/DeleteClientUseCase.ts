import { IClientRepositories } from "../../../repositories/client/IClientRepositories";

export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepositories) {}

  async execute(id: string): Promise<void> {
    await this.clientRepository.deleteById(id);
  }
}
