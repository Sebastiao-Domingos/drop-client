import { SearchTabaratoParms, TabaratoDataResponse } from "@/services/tabarato";

class TabaratoController {
  private static readonly URL = "/api/tabarato";
  public async obter(tabarato : Partial<SearchTabaratoParms>): Promise<TabaratoDataResponse> {
    const params = new URLSearchParams();

    Object.entries(tabarato).forEach((entry) => {
      if (entry[1]) {
        params.append(entry[0], entry[1].toString());
      }
    });

    const reponse = await fetch(`${TabaratoController.URL}?${params.toString()}`);
    const json = await reponse.json();
    if (!reponse.ok) {
      throw new Error(json.error);
    }
    return json;
  }
}

export default TabaratoController;
