"use client";

import Carousel, {
  Indicator,
  Item,
  NextPreviousButtons,
} from "@/components/Carousel";
import Information from "@/components/Information";
import Product from "@/components/Product";
import ProductContainerRow from "@/components/Product/ProductContainerRow";
import ProductContainerRowLoader from "@/components/Skeleton/Loaders/Product/ProductContainerRowLoader";
import { GetProdutoResponse } from "@/controllers/Produto";
import { useGetCarrossel } from "@/hooks/carrossel/useGetCarrossel";
import { useGetProduto } from "@/hooks/useGetProduto";
import PromocaoContainer from "./PromocaoContainer";

interface HomeScreenProps {}

export default function HomeScreen({}: HomeScreenProps) {
  const { body: images, result: resultCarrossel } = useGetCarrossel();
  const { result, body } = useGetProduto<GetProdutoResponse>({
    peerPage: 12,
    currentPage: 1,
    online: 1,
  });
  const { result: resultNews, body: bodyNews } =
    useGetProduto<GetProdutoResponse>({
      news: 1,
      peerPage: 12,
    });

  return (
    <>
      {resultCarrossel.isPending && (
        <div className="w-full h-[350px] bg-slate-700 animate-pulse rounded flex justify-between items-center p-4">
          <div className="w-[55px] h-[35px] rounded-full animate-pulse bg-slate-600"></div>
          <div className="w-[55px] h-[35px] rounded-full animate-pulse bg-slate-600"></div>
        </div>
      )}
      {resultCarrossel.isSuccess && images?.length != 0 && (
        <Carousel autoplay={images!.length > 1}>
          {images?.map((image, index) => (
            <Item
              key={image.id}
              src={image.desktop}
              srcMobile={image.mobile}
              alt={image.descricao}
            />
          ))}
          {/* <Item
            src="/images/slides/slide2.jpg"
            srcMobile="/images/slides/slide-mobile-2.jpg"
            alt="slide-2"
          /> */}
          {/* <Item
            src="/images/slides/slide3.jpg"
            srcMobile="/images/slides/slide-mobile-3.jpg"
            alt="slide-3"
          />
          <Item
            src="/images/slides/slide4.jpg"
            srcMobile="/images/slides/slide-mobile-4.jpg"
            alt="slide-4"
          /> */}
          <Indicator />
          {images!.length > 1 && <NextPreviousButtons />}
        </Carousel>
      )}
      <Information />

      <PromocaoContainer index={0} />

      <div className="space-y-10 mb-8 mt-6 md:mt-0">
        <p className="px-2 ml-1 md:px-0 text-primary text-2xl font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
          Novidade
        </p>
        {resultNews.isSuccess && bodyNews.produtos.length !== 0 && (
          <ProductContainerRow>
            {bodyNews.produtos.map((produto, idx) => (
              <Product produto={produto} key={idx} />
            ))}
          </ProductContainerRow>
        )}
        {resultNews.isError && (
          <span className="text-red-600">
            Ocorreu um erro ao carregar os produtos!
          </span>
        )}
        {resultNews.isSuccess && bodyNews.produtos.length === 0 && (
          <span className="block mb-5">Nenhum produto encontrado!</span>
        )}
        {resultNews.isLoading && <ProductContainerRowLoader />}
      </div>

      <PromocaoContainer index={1} />

      <div className="space-y-10 mb-8">
        <p className="px-2 ml-1 md:px-0 text-primary text-2xl font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
          Diversos
        </p>
        {/* <div className="px-2 lg:px-4">
        </div> */}
        {result.isSuccess && body.produtos.length !== 0 && (
          <ProductContainerRow>
            {body.produtos.map((produto, idx) => (
              <Product produto={produto} key={idx} />
            ))}
          </ProductContainerRow>
        )}
        {result.isError && (
          <span className="text-red-600">
            Ocorreu um erro ao carregar os produtos!
          </span>
        )}
        {result.isSuccess && body.produtos.length === 0 && (
          <span className="block mb-5">Nenhum produto encontrado!</span>
        )}
        {result.isLoading && <ProductContainerRowLoader />}
      </div>

      <PromocaoContainer index={2} />
    </>
  );
}
