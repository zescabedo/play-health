import React, { JSX } from 'react';
import { Field, RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = ComponentProps & {
  fields: Fields;
};

/**
 * Reusable hydration-safe wrapper. Renders empty on server and first client paint,
 * then fills in the HTML after mount — so SSR and the first client render match.
 */
export function SafeRichText({
  field,
  tag = 'div',
  className,
}: {
  field?: Field<string>;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const [html, setHtml] = React.useState<string>('');       // SSR == "", first CSR == ""

  React.useEffect(() => {
    setHtml(field?.value ?? '');                            // fill after mount
  }, [field?.value]);

  return (
    <div suppressHydrationWarning>
      <ContentSdkRichText tag={tag as any} className={className} field={{ value: html }} />
    </div>
  );
}

/**
 * Component used by the Sitecore component map ("RichText" -> Default).
 * Internally it uses the hydration-safe wrapper above.
 */
export const Default = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component rich-text ${styles}`} id={RenderingIdentifier || undefined}>
      <div className="component-content">
        {fields ? (
          <SafeRichText field={fields.Text} />
        ) : (
          <span className="is-empty-hint">Rich text</span>
        )}
      </div>
    </div>
  );
};
