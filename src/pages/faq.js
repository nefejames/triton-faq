import React, {useState, Component } from 'react';
import { Link } from 'react-router-dom';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import '../styles/faq.css';

class faq extends Component {
  constructor(props){
    super(props);

    this.state = {
      clicked1: true,
      clicked2: true,
      clicked3: true,
      clicked4: true
    }
  }

  showFaqAnswerOne(){
    this.setState({clicked1: !this.state.clicked1})
  }
  showFaqAnswerTwo(){
    this.setState({clicked2: !this.state.clicked2})
  }
  showFaqAnswerThree(){
    this.setState({clicked3: !this.state.clicked3})
  }
  showFaqAnswerFour(){
    this.setState({clicked4: !this.state.clicked4})
  }

  render(){
    return(
      <React.Fragment>
          <header>
            <div className="header-content">
              <p><Link to="/" className="back-home"> <ArrowBackIcon size="30"></ArrowBackIcon>Back</Link></p>
              <h1>Frequently Asked Questions</h1>
              <p>
              Finding it hard to get your questions answered about the Triton FinApp?
              Welcome to the FAQ page.
              </p>
            </div>
          </header>

          <main>
            <div className="question-container">
              <div className="question-bar" onClick={() => this.showFaqAnswerOne()}>
                <h2>What is Triton Financial Tracker App about?</h2>
                <ArrowDownwardIcon></ArrowDownwardIcon>
              </div>
              <p className={this.state.clicked1 ? 'faq-answer': null}>
                The Triton FinApp is a system that allows you, the user, track your expenses over time. Do you ever wonder where, how, and on what you spent your money on at the end of the day? With the Triton Fin App, you wont have to wonder anymore.
              </p>
            </div>

            <div className="question-container">
              <div className="question-bar" onClick={() => this.showFaqAnswerTwo()}>
                <h2>Do you need my BVN details when registering?</h2>
                <ArrowDownwardIcon></ArrowDownwardIcon>
              </div>
              <p className={this.state.clicked2 ? 'faq-answer': null}>
                Your BVN details are <em>not</em> needed, and no member of the Triton team would ever request for them, or your bank account information. Ensure you secure such confidential information at all times.
              </p>
            </div>

            <div className="question-container">
            <div className="question-bar" onClick={() => this.showFaqAnswerThree()}>
              <h2>Why do you need my Phone Number during registration?</h2>
              <ArrowDownwardIcon></ArrowDownwardIcon>
            </div>
            <p className={this.state.clicked3 ? 'faq-answer': null}>
              Providing us with your phone number enables us track your spending activity better. With our 'linked account tracking', whenever you receive a debit alert for any purchase, it is immediately noticed and tracked by the application, making it easier for you to track your spending through the Triton FinApp. This automatic tracking is possible only when you link your account number with the Triton system.
            </p>
          </div>

            <div className="question-container">
              <div className="question-bar" onClick={() => this.showFaqAnswerFour()}>
                <h2>Can I carry out transactions through the Triton FinApp?</h2>
                <ArrowDownwardIcon></ArrowDownwardIcon>
              </div>
              <p className={this.state.clicked4 ? 'faq-answer': null}>
                No you cannot. The Triton FinApp is a built to track financial expenditures, not process payments or pay bills.
              </p>
            </div>
          </main>
        </React.Fragment>
    )
  }

}

export default faq