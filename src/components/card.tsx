const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white shadow-md rounded-lg p-6">{children}</div>;
};
export default Card;
