import React from 'react';
import '../../styles/details.css';
import Table from './Table';
import Loader from '../../components/Loader';

function ReportDetail(props) {

    const { activeTab, dashboard, dashboardLoading, expenseList } = props;

    return (
        <div className="report_detail_container">
            <div className="user_details">
                <p>Total spent in { activeTab === "Year" ? new Date().getFullYear() : `this ${activeTab}` }:</p>
                <p className="amount">₦{ dashboardLoading ? <Loader width="25px" /> : dashboard[`${activeTab.toLowerCase()}ly`].toLocaleString() }</p>
            </div>
            <div className="table_container">
                <Table 
                    data={ expenseList[activeTab]["data"] } 
                    loading ={ expenseList[activeTab]['loading'] }
                />
            </div>
      </div>
    )
}

export default ReportDetail
