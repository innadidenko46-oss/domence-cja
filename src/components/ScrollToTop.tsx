import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// New page: start at the top, unless the address points to a section (#…).
// Back, Forward and the first load ('POP') keep the position the browser restores.
// Only a change of page counts: the enquiry's steps share one address and keep their place.
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'POP') return;
    if (hash) {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* a malformed address: look the raw id up */
      }
      document.getElementById(id)?.scrollIntoView();
      return;
    }
    // 'instant': the html element scrolls smoothly, which would glide up from the old place
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
};
