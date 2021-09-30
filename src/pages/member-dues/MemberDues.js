import "./MemberDues.css";
import React, { useEffect, useState } from "react";
import { getUserAccount } from '../../services/accounts';
import NumberFormat from 'react-number-format';
import Modal from "../../components/modal/Modal";


const MemberDues = (props) => {
  const [account, setAccount] = useState({});
  const [duesTable, setDuesTable] = useState();
  const [showPayments, setShowPayments] = useState(false);
  const [showDues, setShowDues] = useState(false);

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

      if (props.memberId) {
        setAccount(await getAccount());
      }
    }

    fetchUserAccount();
  }, [props.memberId])

  const calculateDues = (dues, paypal=false) => {
    if (!dues || Object.keys(dues).length === 0) return 0;

    return paypal ? ((dues.totalOwed + 0.029) / 0.971) + .3 : dues.totalOwed;
  }

  const toggleShowPayments = () => {
    setShowPayments(!showPayments);
  }

  const toggleShowDues = () => {
    setShowDues(!showDues);
  }
  
  useEffect(() => {
    const generateDueRows = () => {
      if (!account?.dues) return <table className="table table-borderless" />;

      let tempDues = [];
      
      account.dues.dues.forEach(item => {
        if (item.amount)
          tempDues.push(item);
      })

      if (tempDues.length > 0)
        tempDues.push({name: "Divider"})

      tempDues.push({name: "Total", amount: account.dues.totalOwed ? account.dues.totalOwed : '$0'})

      return (
        <table className="table table-borderless member-payment-amount-text">
          <tbody>
            {
            tempDues.map((item) => 
              item.name === "Divider" ?
                <tr key={item.name}>
                  <td colSpan="100%">
                    <div style={{margin: "auto", borderBottom: "1px solid rgb(88, 88, 88)", width: "100%"}}></div>
                  </td>
                </tr> :
                <tr key={item.name}>
                  <td style={{width: "50%", textAlign: "left"}}>{item.name}</td>
                  <td style={{width: "50%", textAlign: "right"}}>{item.amount}</td>
                </tr>)
            }
          </tbody>
        </table>
      )
    }

    setDuesTable(generateDueRows());
  }, [account])

  return (
    <div className="member-dues-container">
      <Modal show={showPayments} handleClose={toggleShowPayments}>
        <div className="member-payment-methods-modal">
          <h2>
            Payment options
          </h2>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <p className="member-payment-amount-text">
                    Paypal
                  </p>
                </td>
                <td>
                  <form action="https://www.paypal.me/SaratogaSwim" method="post" target="_blank">
                    <button type="submit" className="btn btn-sscm-primary">
                      Pay
                    </button>
                  </form>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="member-payment-amount-text">
                    Venmo
                  </p>
                </td>
                <td>
                  <button className="btn btn-sscm-primary">
                    Pay
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="member-payment-amount-text">
                    Zelle
                  </p>
                </td>
                <td>
                  <button className="btn btn-sscm-primary">
                    Pay
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
      
      <Modal show={showDues} handleClose={toggleShowDues}>
        <div className="member-payment-methods-modal">
          <h2>
            Outstanding Dues
          </h2>
          {duesTable}
        </div>
      </Modal>
      <div className="member-dues-fees">
        <p>Dues</p>
        <p><NumberFormat value={calculateDues(account?.dues)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
      </div>
      <div className="member-dues-buttons">
        <button className="btn btn-sscm-secondary member-dues-button" onClick={toggleShowDues}>View</button>
        <button className="btn btn-sscm-secondary member-dues-button" onClick={toggleShowPayments}>Pay</button>
      </div>
    </div>
  );
}

export default MemberDues;