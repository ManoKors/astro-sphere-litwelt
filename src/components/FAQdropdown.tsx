import { createSignal } from "solid-js";

type FAQDropdownProps = {
  question: string;
  answer: string;
};

const FAQDropdown = (props: FAQDropdownProps) => {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="faq-item">
      <details open={open()} onClick={() => setOpen(!open())} class="faq-details">
        <summary>{props.question}</summary>
        <p>{props.answer}</p>
      </details>
      <style>
        {`
          .faq-item {
            margin-bottom: 1rem;
          }
          .faq-details summary {
            font-size: 1.25rem;
            font-weight: bold;
            cursor: pointer;
          }
          .faq-details p {
            margin: 0.5rem 0 0;
            padding-left: 1rem;
            line-height: 1.5;
          }
        `}
      </style>
    </div>
  );
};

export default FAQDropdown;
