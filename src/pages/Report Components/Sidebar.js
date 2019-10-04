import React from 'react';
import '../../styles/sidebar.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from "reactstrap";

const SidebarItem = ({ icon:Icon, text, tab, activeTab, onClick })=>(
    <li 
        className={ tab === activeTab ? "active" : "" }
        onClick = { ()=> onClick(tab) }
    >
        { Icon && <Icon /> }
        <p>  { text } </p>
    </li>
)

function Sidebar({ activeTab, onTabClick, onCloseMenu, menuClass, logout }) {
    return (
        <div className={"side_bar "+ menuClass}>
          <div className="close-btn"
            onClick = { onCloseMenu }
          > 
          <CloseIcon /> 
          </div>
          <ul className="side_nav" id="nav_tab">
            <SidebarItem 
                onClick = { onTabClick } 
                tab="dashboard" 
                text="DASHBOARD"
                activeTab = { activeTab }
                icon = { DashboardIcon }
            />
            <SidebarItem 
                onClick = { onTabClick } 
                tab="Year" 
                text="Total By Year"
                activeTab = { activeTab }
                icon = { DateRangeIcon }
            />
            <SidebarItem 
                onClick = { onTabClick } 
                tab="Month" 
                text="Total By Month"
                activeTab = { activeTab }
                icon = { DateRangeIcon }
            />
            <SidebarItem 
                onClick = { onTabClick } 
                tab="Week" 
                text="Total By Week"
                activeTab = { activeTab }
                icon = { DateRangeIcon }
            />
          </ul>
          <div className="text-center">
                <Button
                    color="primary"
                    className="add-expense"
                    onClick = { logout }
                >
                    Log Out
                </Button>
          </div>
        </div>
    )
}

export default Sidebar
