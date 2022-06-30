const IWorkCard = ({ text }: any) => {
  return (
    <p
      style={{
        margin: '4px 0',
        padding: 5,
        background: '#000',
        color: '#fff'
      }}
    >
      {text}
    </p>
  );
};

export default IWorkCard;
