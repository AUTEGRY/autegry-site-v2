import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useDocumentMeta = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = t('meta.title');

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t('meta.description'));
    }

    // Update Open Graph title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', t('meta.title'));
    }

    // Update Open Graph description
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', t('meta.description'));
    }

    // Update Apple mobile web app title
    const appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (appleTitleMeta) {
      appleTitleMeta.setAttribute('content', t('meta.appTitle'));
    }

    // Update Twitter title (if it exists)
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', t('meta.title'));
    }

    // Update Twitter description (if it exists)
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionMeta) {
      twitterDescriptionMeta.setAttribute('content', t('meta.description'));
    }

    // Update lang attribute on html element
    document.documentElement.lang = language;
  }, [t, language]);
};