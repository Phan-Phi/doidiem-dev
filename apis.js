export const SETTINGS = "/api/v2/";

export const TAGS = "/api/v2/tags/";

export const PAGES = "/api/v2/pages/";

export const BANKS = "/api/v2/banks/";

export const STORE_CATEGORIES = "/api/v2/store-categories/";

export const SUBSCRIBERS = "/api/v2/subscribers/"; // WITH POST METHOD

export const SUBMISSIONS = "/api/v2/submissions/"; // WITH POST METHOD

export const PARTNER = "/api/v2/partners/";

export const BLOG_LIST = "blog.BlogListingPage";

export const BLOG_DETAIL = "blog.BlogDetailPage";

export const BLOG_CATEGORIES = "blog.BlogCategoryPage";

export const HOME_PAGE = "home.HomePage";

export const QR_STORE = "/qr/store";

export const QR_CUSTOMER = "/qr/customer";

export const FAQ_LIST = "faq.FAQCategoryListingPage";
export const FAQ_DETAIL = "faq.FAQCategoryPage";

export const PARTNER_LIST = "partner.PartnerListingPage";
export const PARTNER_DETAIL = "partner.PartnerCategoryPage";
export const CONDITION = "policy.ConditionPage";

export const POLICY = "policy.PolicyPage";

export const CONTACT = "contact.ContactPage";

export const PREFIX = "/api/v2";

const pages = "pages";
const settings = "settings";
const contacts = "contacts";
const design_categories = "design-categories";
const construction_categories = "construction-categories";

const generatePathname = (data) => {
  const arr = [PREFIX, ...data];
  return `${arr.join("/")}`;
};

export const types = {
  homePage: "home.HomePage",
  partnerListingPage: "partner.PartnerListingPage",
  partnerDetailPage: "partner.PartnerCategoryPage",

  blogListingPage: "blog.BlogListingPage",
  blogCategoryPage: "blog.BlogCategoryPage",
  blogDetailPage: "blog.BlogDetailPage",

  policyPage: "policy.PolicyPage",

  conditionPage: "policy.ConditionPage",

  faqListingPage: "faq.FAQCategoryListingPage",
  faqDetailPage: "faq.FAQCategoryPage",

  contactPage: "contact.ContactPage",
};

// ?type={str}

// export const types = {
//   homePage: "home.HomePage",
//   constructionListingPage: "construction.ConstructionListingPage",
//   constructionDetailPage: "construction.ConstructionDetailPage",
//   designListingPage: "design.DesignListingPage",
//   designDetailPage: "design.DesignDetailPage",
//   contactPage: "contact.ContactPage",
//   newsListingPage: "news.NewsListingPage",
//   newsDetailPage: "news.NewsDetailPage",
//   operationPolicy: "policy.OperationPolicyPage",
//   paymentPolicy: "policy.PaymentPolicyPage",
//   servicePage: "service.ServicePage",
// };

// export const SETTINGS = generatePathname([settings]);
// export const PAGES = generatePathname([pages]);
// export const DESIGN_CATEGORIES = generatePathname([design_categories]);
// export const CONSTRUCTION_CATEGORIES = generatePathname([construction_categories]);
// export const CONTACTS = generatePathname([contacts]);
