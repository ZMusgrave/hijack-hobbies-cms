import { Box } from '@chakra-ui/react';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { HeroBanner } from '@src/components/features/hero-banner';
import { ProductTileGrid } from '@src/components/features/product';
import { SeoFields } from '@src/components/features/seo';
import { client, previewClient } from '@src/lib/client';

const Page = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const page = useContentfulLiveUpdates(props.page);

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <HeroBanner {...page} />
      {page.productsCollection?.items && (
        <Box
          mt={{
            base: 5,
            md: 9,
            lg: 16,
          }}>
          <ProductTileGrid
            title={'product.trendingProducts'}
            products={page.productsCollection.items}
          />
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;
    console.log('gqlCLIENT IN THE SERVER SIDE PROPS');
    const data = await gqlClient.pageLanding({ locale, preview });

    console.log('\n\n\ndata:', data, '\n\n');

    const page = data.pageLandingCollection?.items[0];

    console.log('\n\n\npage:', page, '\n\n');

    if (!page) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        page,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Page;
