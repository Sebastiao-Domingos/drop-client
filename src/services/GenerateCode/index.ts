import { api } from "@/infra/api";

class GenerateCodeService {
  public async requestNewVerificationCode(whatsapp: string) {
    const response = await api
      .post<{}, { data: { message: string } }>(`/code/${whatsapp}`)
      .then((res) => res.data);

    return { status: 200, response };
  }
}

export default GenerateCodeService;
