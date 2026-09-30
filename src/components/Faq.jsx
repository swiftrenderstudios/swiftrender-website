import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { FAQS } from '../config/faq.js';

/**
 * FAQ accordion. One question open at a time; clicking the open question
 * closes it. Height animates via a CSS grid-rows trick (0fr → 1fr) in
 * index.css, so no JS height measurement is needed.
 */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => setOpenIndex((current) => (current === index ? null : index));

  return (
    <section className="section section--tight container">
      <Reveal><p className="eyebrow">Common Questions</p></Reveal>
      <Reveal><h2>Frequently asked questions</h2></Reveal>

      <Reveal group className="faq">
        {FAQS.map((item, index) => {
          const open = openIndex === index;
          return (
            <div className={`faq-item${open ? ' is-open' : ''}`} key={item.question}>
              <button
                type="button"
                className="faq-item__question"
                onClick={() => toggle(index)}
                aria-expanded={open}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span>{item.question}</span>
                <span className="faq-item__icon" aria-hidden="true" />
              </button>
              <div
                className="faq-item__answer"
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
              >
                <div className="faq-item__answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}