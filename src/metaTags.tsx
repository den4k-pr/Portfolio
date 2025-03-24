import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  imageUrl,
  url,
}) => {
  return (
    <Helmet>
      {/* Заголовок та опис для SEO, Open Graph (для Facebook, Instagram, Telegram) та Twitter */}
      <meta name="description" content={description} />
      <meta name="keywords" content="full stack developer, JavaScript developer, web development, MERN stack, React and Node.js developer" />

      {/* Open Graph (Facebook, Instagram, Telegram) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};
