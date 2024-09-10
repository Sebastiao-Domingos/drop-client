import { api } from "@/infra/api";

export type NewsletterCreateData = {
  whatsapp: string;
};
export type NewsletterData = {
  id: string;
  whatsapp: string;
  created_at: Date;
  updated_at: Date;
};

class NewsletterService {
  private readonly BASE_URL = "/newsletter";

  async subscribe(data: NewsletterCreateData) {
    const response = await api
      .post<{}, { data: NewsletterData }>(this.BASE_URL, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default NewsletterService;
