import "./header.css";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  return <div className={`c-header ${className ? className : ""}`}>header</div>;
};
