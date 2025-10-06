// Below are built-in components that are available in the app, it's recommended to keep them as is
import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';
// end of built-in components

// Components imported from the app itself
import * as Title from 'src/components/Title';
import * as RowSplitter from 'src/components/RowSplitter';
import * as RichText from 'src/components/RichText';
import * as Promo from 'src/components/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/PageContent';
import * as NewComponentName from 'src/components/NewComponentName';
import * as Navigation from 'src/components/Navigation';
import * as LinkList from 'src/components/LinkList';
import * as Image from 'src/components/Image';
import * as ContentBlock from 'src/components/ContentBlock';
import * as Container from 'src/components/Container';
import * as ColumnSplitter from 'src/components/ColumnSplitter';
import * as button from 'src/components/ui/button';


// Components must be registered within the map to match the string key with component name in Sitecore
export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', Title],
  ['RowSplitter', RowSplitter],
  ['RichText', RichText],
  ['Promo', Promo],
  ['PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder],
  ['PageContent', PageContent],
  ['NewComponentName', NewComponentName],
  ['Navigation', Navigation],
  ['LinkList', LinkList],
  ['Image', Image],
  ['ContentBlock', ContentBlock],
  ['Container', Container],
  ['ColumnSplitter', ColumnSplitter],
  ['button', button],
]);

export default componentMap;
