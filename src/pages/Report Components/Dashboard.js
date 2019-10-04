import React from 'react';
import '../../styles/Dashboard.css';
import Wallet from '../../components/svgs/Wallet';
import Loader from '../../components/Loader';

function Dashboard(props) {

    let { dashboardLoading, dashboard } = props;

    return (
        <div className="dashboard_cards" id="dashboard">
            <div className="square_cards">
                <div className="card_square card_left">
                    <Wallet fill={ "#ffffff" } />
                    { 
                        dashboardLoading ? 
                        <Loader width="25px" /> : 
                        <p className="amount">₦{ dashboard.weekly.toLocaleString() }</p> 
                    }
                    <p>Total spent in a week</p>
                </div>
                <div className="card_square card_right">
                    <Wallet fill={ "#ffffff" } />
                    { 
                        dashboardLoading ? 
                        <Loader width="25px" /> 
                        : <p className="amount">₦{ dashboard.monthly.toLocaleString() }</p> 
                    }
                    <p>Total spent in a month</p>
                </div>
            </div>
            <div className="card_rect">
                <Wallet fill={ "#ffffff" } />
                {
                    dashboardLoading ? 
                    <Loader width="25px" /> 
                    :<p className="amount">₦{ dashboard.yearly.toLocaleString() }</p> 
                }
                <p>Total spent in a year</p>
            </div>
      </div>
    )
}

export default Dashboard
