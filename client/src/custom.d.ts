declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}

declare module "*.graphql" {
    const content: any;
    export default content;
}

declare module '*.graphql' {
    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;
  
    export = Schema
  }

declare module 'lodash.debounce';