import ProductService from '@/services/products';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const produtoService = new ProductService();
  const {
    response: { produtos },
  } = await produtoService.getAll('peerPage=10000&online=1');

  const { response: subProdutos } =
    await produtoService.categoria.subCategoria.subProduto.getAll();

  const { response: subCategorias } =
    await produtoService.categoria.subCategoria.getAll();

  const { response: categorias } = await produtoService.categoria.getAll();

  const { response: marcas } = await produtoService.marca.getAll();

  const urlsProdutos = produtos.map<any>((produto) => ({
    url: `${process.env.BASE_URL}/category/${produto.sub_produto.sub_categoria
      .categoria
      .id!}/${produto.sub_produto.sub_categoria.categoria.nome.replaceAll(
      ' ',
      '-'
    )}/subcategory/${
      produto.sub_produto.sub_categoria.id
    }/${produto.sub_produto.sub_categoria.nome.replaceAll(
      ' ',
      ''
    )}/subproduct/${produto.sub_produto.id}/product/${produto.referencia}`,
    lastModified: produto.updated_at,
    changeFrequency: 'monthly',
    priority: 1,
  }));

  const urlsSubprodutos = subProdutos.map<any>((subproduto) => ({
    url: `${process.env.BASE_URL}/category/${subproduto.sub_categoria.categoria
      .id!}/${encodeURIComponent(
      subproduto.sub_categoria.categoria.nome.replaceAll(' ', '-')
    )}/subcategory/${
      subproduto.sub_categoria.id
    }/${subproduto.sub_categoria.nome.replaceAll(' ', '-')}/subproduct/${
      subproduto.id
    }/${subproduto.nome.replaceAll(' ', '-')}?subproduto=${subproduto.nome}`,
    lastModified: subproduto.updated_at,
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  const urlsCategorias = categorias.map<any>((categoria) => ({
    url: `${process.env.BASE_URL}/category/${categoria.id}/${encodeURIComponent(
      categoria.nome.replaceAll(' ', '-')
    )}?categoria=${categoria.nome}`,
    lastModified: categoria.updated_at,
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  const urlsSubCategorias = subCategorias.map<any>((subcategoria) => ({
    url: `${process.env.BASE_URL}/category/${
      subcategoria.categoria.id
    }/${encodeURIComponent(
      subcategoria.categoria.nome.replaceAll(' ', '-')
    )}/subcategory/${subcategoria.id}/${subcategoria.nome.replaceAll(
      ' ',
      '-'
    )}?subcategoria=${subcategoria.nome}`,
    lastModified: subcategoria.updated_at,
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  const urlsMarcas = marcas.map<any>((marca) => ({
    url: `${process.env.BASE_URL}/marcas/${marca.id}/${encodeURIComponent(
      marca.nome.replaceAll(' ', '-')
    )}/1`,
    lastModified: marca.updated_at,
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.BASE_URL}/`,
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/login`,
      priority: 0.6,
    },
    {
      url: `${process.env.BASE_URL}/signup`,
      priority: 0.6,
    },
    ...urlsProdutos,
    ...urlsSubprodutos,
    ...urlsSubCategorias,
    ...urlsCategorias,
    ...urlsMarcas,
  ];
}
