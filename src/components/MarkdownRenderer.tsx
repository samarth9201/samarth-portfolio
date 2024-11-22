import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt({ html: true });

const MarkdownRenderer = ({ markdown }: { markdown: string }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: mdParser.render(markdown),
    }}
  />
);

export default MarkdownRenderer;
