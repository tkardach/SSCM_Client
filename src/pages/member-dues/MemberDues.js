import "./MemberDues.css";
import React, { useEffect, useState } from "react";
import { getUserAccount } from '../../services/accounts';
import NumberFormat from 'react-number-format';

const MemberDues = (props) => {
  const [account, setAccount] = useState({});
  const [dues, setDues] = useState(0);

  useEffect(() => {
    async function fetchUserAccount() {
      const getAccount = async () => {
        return await getUserAccount()
          .then(async data => {
            if (data.status === 200)
              return await data.json();

            return '';
          })
          .catch(err => {
            console.log(err);
            return '';
          })
      }

      if (props.memberId)
        setAccount(await getAccount());
    }

    fetchUserAccount();
  }, [props.memberId])

  const calculateDues = (dues) => {
    if (!dues || Object.keys(dues).length === 0) return 0;

    return dues.totalOwed;
  }

  return (
    <div className="member-dues-container">
      <div className="member-dues-fees">
        <p>Dues</p>
        <p><NumberFormat value={calculateDues(account?.dues)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
      </div>
      <div className="member-dues-buttons">
        <button className="btn btn-sscm-secondary member-dues-button">View</button>
        <button className="btn btn-sscm-secondary member-dues-button">Pay</button>
      </div>
    </div>
  );
}

export default MemberDues;