import { Box } from '@chakra-ui/react';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { ProductDetails, ProductTileGrid } from '@src/components/features/product';
import { SeoFields } from '@src/components/features/seo';
import { client, previewClient } from '@src/lib/client';

const Page = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const product = useContentfulLiveUpdates(props.product);

  return (
    <>
      {product.seoFields && <SeoFields {...product.seoFields} />}
      <ProductDetails {...product} />
      {product.relatedProductsCollection?.items && (
        <Box
          mt={{
            base: 5,
            md: 9,
            lg: 16,
          }}>
          <ProductTileGrid
            title={'product.relatedProducts'}
            products={product.relatedProductsCollection.items}
          />
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale, preview }) => {
  if (!params?.slug || !locale) {
    return {
      notFound: true,
    };
  }

  const gqlClient = preview ? previewClient : client;

  try {
    const data = await gqlClient.pageProduct({ slug: params.slug.toString(), locale, preview });
    const product = data.pageProductCollection?.items[0];

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Page;
