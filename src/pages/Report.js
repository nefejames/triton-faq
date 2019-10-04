import React, { Component } from 'react';
import Sidebar from "./Report Components/Sidebar";
import { UserContext } from '../UserContext';
import ReportDetail from './Report Components/ReportDetail';
import Dashboard from './Report Components/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddExpenseModal from './Report Components/AddExpenseModal';
import { getWithAuth } from "../utils/APIRequest";
import { Button } from 'reactstrap';
import "../styles/Report.css";

class Report extends Component {

    constructor(props){
      super(props)
      this.state = {
        activeTab : "dashboard",
        menuClass : "",
        modalIsOpen : false,
        dashboardLoading:true,
        dashboard : {
          weekly: 0,
          monthly: 0,
          yearly: 0
        },
        expenseList:{
          Year:{loading:false, data:[]},
          Month:{loading:false, data:[]},
          Week:{loading:false, data:[]}
        },

      }
      this.handleTabClick = this.handleTabClick.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
      this.showMenu = this.showMenu.bind(this);
      this.openModal = this.openModal.bind(this);
      this.fetchDashboardData = this.fetchDashboardData.bind(this);
      this.refreshDasboard = this.refreshDasboard.bind(this)
      this.logout = this.logout.bind(this);
      Report.contextType = UserContext;
    }

    
    handleTabClick(activeTab){
      this.setState({ activeTab, menuClass:"" });
    }

    showMenu(){
      this.setState({ menuClass:"mobile-show" })
    }

    closeMenu(){
      this.setState({ menuClass:"" })
    }

    openModal(modalIsOpen){
      this.setState({ modalIsOpen:modalIsOpen })
    }

    async fetchDashboardData(){
      let response = await getWithAuth('/dashboard/');
      const { status } = response;
      const dashboard = await response.json();

      if(status === 200 ){
        this.openModal(false);
        this.setState({ dashboard, dashboardLoading:false });
      }
    }

    async fetchTableData(tab){

      let { expenseList } = this.state;

      expenseList[tab]["loading"] = true;
      this.setState({ expenseList });

      const response = await getWithAuth(`/${tab.toLowerCase()}ly/`);
      const { status } = response;
      const data = await response.json();

      if(status === 200 ){
        ({ expenseList } = this.state);
        expenseList[tab]["data"] = Object.values(data);
        expenseList[tab]["loading"] = false;
        this.setState({ expenseList });
      }

    }

    componentDidMount(){
      this.fetchDashboardData();
      this.fetchTableData('Year');
      this.fetchTableData('Month');
      this.fetchTableData('Week');
    }

    logout(){
      var {updateUser} = this.context;
      delete localStorage._authuser;
      updateUser({isLoggedIn:false, userData:{}});
    }

    refreshDasboard(){
      this.fetchDashboardData();
      this.fetchTableData('Year');
      this.fetchTableData('Month');
      this.fetchTableData('Week');
    }

    render() {
        const { activeTab } = this.state;
        const { user } = this.context;

        return (
            <div className="report_container">
                <Sidebar 
                  { ...this.state }
                  onCloseMenu = { this.closeMenu }
                  onTabClick = { this.handleTabClick } 
                  logout = { this.logout } 
                />
                <main className="report_content">
                  <nav className="mobile_nav">
                    <MenuIcon 
                      onClick = { this.showMenu }
                      width="1.5em" 
                      height="1.5em"  
                      fill="#fff" 
                    />
                    <h3>Dashboard</h3>
                  </nav>
                  <div className="header_nav">
                    <h4>Welcome { user.userData.username },</h4>
                    <Button 
                      color="primary" 
                      className="add-expense"
                      onClick = { e=>this.openModal(true) }
                    >
                      <AddCircleIcon /> New Expense
                    </Button>
                  </div>
                  <div className="view-content" >
                    {
                      activeTab === "dashboard" 
                      ? <Dashboard { ...this.state } />
                      : <ReportDetail { ...this.state } />
                    }
                  </div>
                  <AddExpenseModal 
                    open = { this.openModal } 
                    isOpen = { this.state.modalIsOpen } 
                    refreshDasboard = { this.refreshDasboard }
                  />
                </main>
            </div>
        );
    }
}

export default Report;