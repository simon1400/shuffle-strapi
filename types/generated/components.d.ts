import type { Schema, Struct } from '@strapi/strapi';

export interface ActionCta extends Struct.ComponentSchema {
  collectionName: 'components_action_ctas';
  info: {
    displayName: 'cta';
    icon: 'brush';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentCompBenefits extends Struct.ComponentSchema {
  collectionName: 'components_content_comp_benefits';
  info: {
    displayName: 'benefits';
    icon: 'bold';
  };
  attributes: {
    contentText: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface ContentCompDescriptionBlockComp
  extends Struct.ComponentSchema {
  collectionName: 'components_content_comp_description_block_comps';
  info: {
    displayName: 'DescriptionBlockComp';
    icon: 'bulletList';
  };
  attributes: {
    contentText: Schema.Attribute.String & Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'action.cta', false>;
    icon: Schema.Attribute.Media<'images'>;
  };
}

export interface ContentCompParameter extends Struct.ComponentSchema {
  collectionName: 'components_content_comp_parameters';
  info: {
    description: '';
    displayName: 'Parameter';
    icon: 'archive';
  };
  attributes: {
    has: Schema.Attribute.Boolean;
    parameter: Schema.Attribute.Relation<
      'oneToOne',
      'api::parameter.parameter'
    >;
    text: Schema.Attribute.String;
  };
}

export interface ContentCompareTable extends Struct.ComponentSchema {
  collectionName: 'components_content_compare_tables';
  info: {
    displayName: 'Compare table';
    icon: 'cast';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    title: Schema.Attribute.String;
  };
}

export interface ContentContentItem extends Struct.ComponentSchema {
  collectionName: 'components_content_content_items';
  info: {
    displayName: 'contentItem';
    icon: 'filter';
  };
  attributes: {
    contentText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    galery: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentCtaBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_cta_blocks';
  info: {
    displayName: 'ctaBlock';
    icon: 'apps';
  };
  attributes: {
    cta: Schema.Attribute.Component<'action.cta', false>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface ContentDescriptionBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_description_blocks';
  info: {
    description: '';
    displayName: 'descriptionBlock';
    icon: 'archive';
  };
  attributes: {
    block: Schema.Attribute.Component<
      'content-comp.description-block-comp',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface ContentLogoCarousel extends Struct.ComponentSchema {
  collectionName: 'components_content_logo_carousels';
  info: {
    displayName: 'logoCarousel';
    icon: 'cog';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface ContentShortArtciles extends Struct.ComponentSchema {
  collectionName: 'components_content_short_artciles';
  info: {
    displayName: 'shortArtciles';
    icon: 'crop';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
  };
}

export interface NavNav extends Struct.ComponentSchema {
  collectionName: 'components_nav_navs';
  info: {
    displayName: 'Nav';
    icon: 'dashboard';
  };
  attributes: {
    items: Schema.Attribute.Component<'nav.nav-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface NavNavItem extends Struct.ComponentSchema {
  collectionName: 'components_nav_nav_items';
  info: {
    displayName: 'navItem';
    icon: 'discuss';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavSocItem extends Struct.ComponentSchema {
  collectionName: 'components_nav_soc_items';
  info: {
    displayName: 'socItem';
    icon: 'cog';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['facebook', 'twitter', 'instagram', 'linkedin']
    > &
      Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoMetaData extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_data';
  info: {
    displayName: 'metaData';
    icon: 'attachment';
  };
  attributes: {
    description: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'action.cta': ActionCta;
      'content-comp.benefits': ContentCompBenefits;
      'content-comp.description-block-comp': ContentCompDescriptionBlockComp;
      'content-comp.parameter': ContentCompParameter;
      'content.compare-table': ContentCompareTable;
      'content.content-item': ContentContentItem;
      'content.cta-block': ContentCtaBlock;
      'content.description-block': ContentDescriptionBlock;
      'content.logo-carousel': ContentLogoCarousel;
      'content.short-artciles': ContentShortArtciles;
      'nav.nav': NavNav;
      'nav.nav-item': NavNavItem;
      'nav.soc-item': NavSocItem;
      'seo.meta-data': SeoMetaData;
    }
  }
}
