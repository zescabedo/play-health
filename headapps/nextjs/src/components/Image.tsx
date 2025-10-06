import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  LinkField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import React, { CSSProperties, type JSX } from 'react';

interface Fields {
  Image: ImageField & { metadata?: { [key: string]: unknown } };
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const classHeroBannerEmpty =
    isPageEditing && props.fields?.Image?.value?.class === 'scEmptyImage'
      ? 'hero-banner-empty'
      : '';

  const backgroundStyle = (props?.fields?.Image?.value?.src && {
    backgroundImage: `url('${props.fields.Image.value.src}')`,
  }) as CSSProperties;

  if (!props.fields?.Image) {
    return <ImageDefault {...props} />;
  }

  const modifyImageProps = {
    ...props.fields.Image,
    value: {
      ...props.fields.Image.value,
      style: { width: '100%', height: '100%' },
    },
  };

  return (
    <div
      className={`component hero-banner ${props.params.styles} ${classHeroBannerEmpty}`}
      id={id ? id : undefined}
    >
      {/* Put suppressHydrationWarning on a DOM element that might differ in children */}
      <div
        className="component-content sc-sxa-image-hero-banner"
        style={backgroundStyle}
        suppressHydrationWarning
      >
        {isPageEditing ? <ContentSdkImage field={modifyImageProps} /> : null}
      </div>
    </div>
  );
};

export const Default = (props: ImageProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  if (props.fields) {
    const Img = () => <ContentSdkImage field={props.fields.Image} />;
    const id = props.params.RenderingIdentifier;

    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        {/* Wrap the content block so SSR/CSR differences (editing vs not) don’t error */}
        <div className="component-content" suppressHydrationWarning>
          {isPageEditing || !props.fields.TargetUrl?.value?.href ? (
            <Img />
          ) : (
            <ContentSdkLink field={props.fields.TargetUrl}>
              <Img />
            </ContentSdkLink>
          )}

          {/* Optional: also guard caption to be extra safe */}
          <div suppressHydrationWarning>
            <Text
              tag="span"
              className="image-caption field-imagecaption"
              field={props.fields.ImageCaption}
            />
          </div>
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
