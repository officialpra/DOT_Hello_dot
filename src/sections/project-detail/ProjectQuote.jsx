const ProjectQuote = ({ quote, author }) => {
  return (
    <blockquote className="project-quote">
      <p>{quote}</p>
      {author && <cite>{author}</cite>}
    </blockquote>
  );
};
export default ProjectQuote;
