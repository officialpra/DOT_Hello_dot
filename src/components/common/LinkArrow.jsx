import Link from "next/link";

const LinkArrow = ({ href, label }) => {
  return <Link href={href}>{label} →</Link>;
};

export default LinkArrow;
