import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";
export const appUrl = process.env.APP_URL;

export const usersMachine = dataMachine("users").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      let route = isEmpty(payload) ? "users" : "users/search";
      const resp = await httpClient.get(`https://appqa.vercel.app/${route}`, {
        params: !isEmpty(payload) ? payload : undefined,
      });
      return resp.data;
    },
  },
});
