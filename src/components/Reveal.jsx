import { useEffect, useRef, useState } from 'react';

/**
 * <Reveal> — fades and rises its content into view the first time it
 * scrolls into the viewport, using a single IntersectionObserver per
 * instance. This is the React equivalent of the static site's
 * `data-reveal` / `data-reveal-group` attributes + vanilla JS observer.
 *
 * Usage:
 *   <Reveal>...</Reveal>                          single element
 *   <Reveal group>...multiple children...</Reveal> staggers each child
 *   <Reveal as="section" className="...">          renders a different tag
 *
 * Any other prop (onSubmit, style, id, etc.) is forwarded to the rendered
 * element, so this can wrap a <section>, <form>, or any other tag.
 */
export default function Reveal({ children, group = false, as: Tag = 'div', className = '', ...rest }) {
  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const baseClass = group ? 'reveal-group' : 'reveal';
  const combinedClass = [baseClass, visible ? 'is-visible' : '', className].filter(Boolean).join(' ');

  return (
    <Tag ref={nodeRef} className={combinedClass} {...rest}>
      {children}
    </Tag>
  );
}