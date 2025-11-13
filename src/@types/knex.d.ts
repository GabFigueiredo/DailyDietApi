// eslint-disable-next-line
import { Knex } from "knex";
// ou faça apenas:
// import 'knex'

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      email: string;
      name: string;
      password: string;
    };

    meals: {
      id: string;
      name: string;
      description: string;
      dateAndTime: Date;
      isOnDiet?: boolean;
      user_id: string;
    };
  }
}
