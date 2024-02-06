import { getKioskStats } from '../services/KioskInfo';
import { useState, useEffect, useCallback } from 'react';
import KioskStats from '../models/KioskStats';
import { money } from '../utils/Money';
import DateGroup from '../components/DateGroup'
import { useNavigate } from "react-router-dom";

export interface StatsTableProps {
  option: string;
}

function StatsTable(props: StatsTableProps) {

    const history = useNavigate();
    var empty: KioskStats = { sales: [], groups: [] }
    const [stats, setStats] = useState(empty);
    const [salesDataRange, setSalesDataRange] = useState('Most Recent')


  const refreshStats = useCallback((opt:string) => {
    getKioskStats(opt).then(res => {
      console.log('got response')
      setStats(res)
    }).catch(_err => {
      history("/error?message=Can't retrieve sales!");
    })
  }, [history])


  useEffect(() => {
    refreshStats(props.option)
    switch (props.option) {
      case "last":
        setSalesDataRange("Most Recent")
        break;
      case "daily":
        setSalesDataRange("Daily")
        break;
      case "weekly":
        setSalesDataRange("Weekly")
        break;
      case "monthly":
        setSalesDataRange("Monthly")
        break;
      default:
        setSalesDataRange("Default")
        break;
    }
  }, [refreshStats, props.option]);

  function Total() {
    var amounts = stats.sales.length > 0
      ? stats.sales.map((sale, _index) => sale.amount)
      : stats.groups.map((group, _index) => group.subtotal)
    var total = amounts.reduce((acc, val) => acc + val, 0)
    return <span>{money(total)}</span>
  }

  function renderAggsTable() {
    return (
      <table className="table mb-0">
        <thead>
          <tr>
            <th scope="row" style={{ width: '33%' }}>Date</th>
            <th scope="row" className="text-right">Sales</th>
            <th scope="row" className="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {renderAggs()}
        </tbody>
      </table>
    );
  }

  function renderAggs() {
    return stats.groups.map((group, index) =>
      <tr data-index={index} style={{ fontSize: '14px' }}>
        <th scope="row">
          <DateGroup date={group.date} option={props.option} />
        </th>
        <td className="text-right">{group.numtrx}</td>
        <td className="text-right">{money(group.subtotal)}</td>
      </tr>
    );
  }

  // function renderLastDays() {
  //   return months.map((day, index) =>
  //     <a className="list-group-item list-group-item-action" 
  //       data-index={index} aria-current="true" >
  //       {day}
  //     </a>
  //   );
  // }

  // const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  function renderSalesTable() {
    return (
        <table className="table mb-0">
          <thead>
            <tr>
              <th scope="row">Date</th>
              <th scope="row">Reference</th>
              <th scope="row">Card</th>
              <th scope="row" className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {renderSales()}
          </tbody>
        </table>
    );
  }
  function renderSales() {

  return stats.sales.map((sale, index) => (
    <tr data-index={index} style={{ fontSize: '14px' }}>
      <th scope="row">{sale.created_at.toLocaleString()}</th>
      <td>{sale.uuid}</td>
      <td>{sale.last_4_digits}</td>
      <td className="text-right">{money(sale.amount)} {sale.currency}</td>
    </tr>
  ));
  }
  
 

  function SelectView() {
    if (stats.sales.length > 0) {
    return renderSalesTable()
    } else {
    return renderAggsTable()
    }
  }


    return <div className="d-flex flex-column justify-content-between">

          <div className="row h-100">
            <div className="col">
              <h3>
                {salesDataRange} Sales
              </h3>
              <div className="card card-default h-100">
                <div className="card-body px-2 py-0">
                  <div className="table-responsive" style={{overflowY: 'scroll', height: "340px"}}>
                    <SelectView />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-default rounded-3">
            <h6 className="card-body my-2 py-2">
              <div className="d-flex justify-content-between">
                <div className="">
                  TOTAL
                </div>
                <div className="">
                  <Total />
                </div>
              </div>
            </h6>
          </div>
        </div>
}

export default StatsTable;
