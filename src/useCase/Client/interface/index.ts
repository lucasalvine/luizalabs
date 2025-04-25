import { ObjectId } from "typeorm";

export interface IClient {
  name: string,
  email: string,
}

export interface IClientParams {
  id?: string,
  name?: string,
  email?: string,
}