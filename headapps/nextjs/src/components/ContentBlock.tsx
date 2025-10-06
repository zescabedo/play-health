import { Text, RichText, Field, withDatasourceCheck } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

type ContentBlockProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * Content SDK component that's useful.
 */
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
  <div className="contentBlock">
    {/* Optional safeguard around heading */}
    <div suppressHydrationWarning>
      <Text tag="h2" className="contentTitle" field={fields.heading} />
    </div>

    {/* ✅ Important: suppressHydrationWarning prevents SSR/CSR mismatch */}
    <div suppressHydrationWarning>
      <RichText className="contentDescription" field={fields.content} />
    </div>
  </div>
);

export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
