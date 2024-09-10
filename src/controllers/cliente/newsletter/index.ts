import { NewsletterCreateData, NewsletterData } from "@/services/newsletter";

class NewsletterController {
  async subscribe(data: NewsletterCreateData): Promise<NewsletterData> {
    const response = await fetch("/api/cliente/newsletter", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default NewsletterController;
