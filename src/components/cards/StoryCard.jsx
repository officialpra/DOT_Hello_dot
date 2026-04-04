import Link from "next/link";

const StoryCard = ({ title, date, image, slug }) => {
  return (
    <Link href={`/stories/${slug}`}>
      <div className="story-card">
        {/* Story card content */}
        <h3>{title}</h3>
        <span>{date}</span>
      </div>
    </Link>
  );
};

export default StoryCard;
