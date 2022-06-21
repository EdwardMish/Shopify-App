import { Card, Page, Layout, Stack, Heading, TextContainer, TextStyle } from '@shopify/polaris';
import { AddMajor } from '@shopify/polaris-icons';
import { ProductsCard } from '../components/ProductsCard';

import DiscountGroup from '../components/DiscountGroup';

export function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            title="Conditional Discount based on Tags"
            actions={[{ content: 'New Group', icon: AddMajor }]}
          >
            <Card.Section
              title="Group 1"
              actions={[{ content: 'New Condition', icon: AddMajor }]}
              flush
            >
              <DiscountGroup />
              <DiscountGroup />
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
