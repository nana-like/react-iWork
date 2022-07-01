import styled from 'styled-components';

const IWorkCard = ({ text }: any) => {
  return <Card>{text}</Card>;
};

export default IWorkCard;

const Card = styled.div`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.8rem;
  padding: 1.4rem 1.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 3px;

  color: #fff;
  background-color: #111;
  line-height: 2.4rem;

  /* border: 1px solid #111; */
`;
