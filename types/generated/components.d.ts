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

export interface ContentCompDescriptionBlockComp
  extends Struct.ComponentSchema {
  collectionName: 'components_content_comp_description_block_comps';
  info: {
    description: '';
    displayName: 'DescriptionBlockComp';
    icon: 'bulletList';
  };
  attributes: {
    contentText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    cta: Schema.Attribute.Component<'action.cta', false>;
    icon: Schema.Attribute.Media<'images'>;
  };
}

export interface ContentCompLabel extends Struct.ComponentSchema {
  collectionName: 'components_content_comp_labels';
  info: {
    description: '';
    displayName: 'label';
    icon: 'connector';
  };
  attributes: {
    hexColor: Schema.Attribute.String & Schema.Attribute.Required;
    invertText: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface ContentImageTextCta extends Struct.ComponentSchema {
  collectionName: 'components_content_image_text_ctas';
  info: {
    description: 'Block with image, title, text and CTA button';
    displayName: 'ImageTextCta';
    icon: 'picture';
  };
  attributes: {
    cta: Schema.Attribute.Component<'action.cta', false>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface ContentVideoGallery extends Struct.ComponentSchema {
  collectionName: 'components_content_video_galleries';
  info: {
    description: 'Grid gallery for YouTube videos';
    displayName: 'videoGallery';
    icon: 'play';
  };
  attributes: {
    title: Schema.Attribute.String;
    videos: Schema.Attribute.Component<'content.video-item', true>;
  };
}

export interface ContentVideoItem extends Struct.ComponentSchema {
  collectionName: 'components_content_video_items';
  info: {
    description: 'Single YouTube video item';
    displayName: 'videoItem';
    icon: 'play';
  };
  attributes: {
    title: Schema.Attribute.String;
    youtubeUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LinksLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    displayName: 'Links';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    catalogs: Schema.Attribute.Relation<'oneToMany', 'api::catalog.catalog'>;
    compares: Schema.Attribute.Relation<'oneToMany', 'api::compare.compare'>;
    contacts: Schema.Attribute.Relation<'oneToMany', 'api::contact.contact'>;
    globals: Schema.Attribute.Relation<'oneToMany', 'api::global.global'>;
    homepages: Schema.Attribute.Relation<'oneToMany', 'api::homepage.homepage'>;
    navigations: Schema.Attribute.Relation<
      'oneToMany',
      'api::navigation.navigation'
    >;
    parameters: Schema.Attribute.Relation<
      'oneToMany',
      'api::parameter.parameter'
    >;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
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
      'content-comp.description-block-comp': ContentCompDescriptionBlockComp;
      'content-comp.label': ContentCompLabel;
      'content-comp.parameter': ContentCompParameter;
      'content.compare-table': ContentCompareTable;
      'content.content-item': ContentContentItem;
      'content.cta-block': ContentCtaBlock;
      'content.description-block': ContentDescriptionBlock;
      'content.image-text-cta': ContentImageTextCta;
      'content.logo-carousel': ContentLogoCarousel;
      'content.short-artciles': ContentShortArtciles;
      'content.video-gallery': ContentVideoGallery;
      'content.video-item': ContentVideoItem;
      'links.links': LinksLinks;
      'nav.nav': NavNav;
      'nav.nav-item': NavNavItem;
      'nav.soc-item': NavSocItem;
      'seo.meta-data': SeoMetaData;
    }
  }
}
