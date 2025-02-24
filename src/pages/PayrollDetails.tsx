import styled from "styled-components";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Details from "../components/Payroll/Details";

const Container = styled.div`
  padding: 20px;
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
`;
const ProfileInfoWrapper = styled.div`
  display: flex-column;
`;
const DetailsWrapper = styled.div`
  display: flex-column;
  width: 70%;
  margin-left: 6rem;
`;

const PayrollDetails = () => {
  return (
    <Container>
      <ProfileInfoWrapper>
        <h3 style={{ marginLeft: "2rem" }}>직원 정보</h3>
        <ProfileInfo />
      </ProfileInfoWrapper>
      <DetailsWrapper>
        <h3>급여 내역</h3>
        <Details />
      </DetailsWrapper>
    </Container>
  );
};

export default PayrollDetails;
