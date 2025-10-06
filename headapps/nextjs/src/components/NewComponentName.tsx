import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

interface NewComponentNameProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: NewComponentNameProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>NewComponentName Component</p>
      </div>
    </div>
  );
};
