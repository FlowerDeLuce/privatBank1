import React, { Component } from 'react';

import './App.css';

class ResultContainer extends Component{
    componentDidMount(){
     
    }
    
   render() {
      var Result = this.props.result;
       var selectCurrency = +this.props.SelectValue
       if (Result && Result[selectCurrency]['currency']){
             console.log('Result ' + Result[selectCurrency]['currency']);
           return (
      <div className="result">
        result {this.props.date} {this.props.month} {this.props.year} 
        <div>
               
               <div> {Result[selectCurrency]['currency']  } </div>
               <div> purchaseRateNB {Result[selectCurrency]['purchaseRateNB']  } </div>
               <div> saleRateNB {Result[selectCurrency]['saleRateNB']  } </div>
               
        </div>
        
      </div>
    );
       }
       else{
           return <div> wait... </div>
       }
     
       
    
  }
}

class DateInput extends Component{
   
    
    
   render() {
    return (
      <div className="date">
        <input type="text"  placeholder="date" onChange={this.props.onDateChangeHandler}/>
        <input type="text" placeholder="month" onChange={this.props.onMonthChangeHandler}/>
        <input type="text" placeholder="year" onChange={this.props.onYearChangeHandler}/>
        <select value={this.props.SelectValue} onChange={this.props.onCurrencyChangeHandler}>
              <option value="0">AUD</option>
              <option value="1">CAD</option>
              <option value="2">CZK</option>
              <option value="3">DKK</option>
              <option value="4">HUF</option>
              <option value="5">ILS</option>
              <option value="6">JPY</option>
              <option value="7">LVL</option>
              <option value="8">LTL</option>
              <option value="9">NOK</option>
              <option value="10">SKK</option>
              <option value="11">SEK</option>
              <option value="12">CHF</option>
              <option value="13">RUB</option>
              <option value="14">GBP</option>
              <option value="15">USD</option>
              <option value="16">BYR</option>
              <option value="17">EUR</option>
              <option value="18">GEL</option>
              <option value="19">PLZ</option>
        </select>
        <input type="submit" value="fetch" onClick = {this.props.onsubmithandler}/>
      </div>
    );
  }
}

class App extends Component {
     constructor(props) {
        super(props);
        this.state = {
            date: '01',
            month: '12',
            year: '2014',
            currency: 'Aud',
            SelectValue: '0',
            result: ''
          
        };
        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.onMonthChangeHandler = this.onMonthChangeHandler.bind(this);
        this.onYearChangeHandler = this.onYearChangeHandler.bind(this);
         this.onsubmithandler = this.onsubmithandler.bind(this);
         this.onCurrencyChangeHandler = this.onCurrencyChangeHandler.bind(this);
    }
    
   componentDidMount(){
     const URL = "https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014";
        
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
     
    
     fetch(proxyUrl + URL).then(res => res.json()).then(json => {
      this.setState({ result: json.exchangeRate });
         
    });
     /*  fetch(proxyUrl + URL).then(res => console.log('res' + res));*/
       
    
    }
     onDateChangeHandler(e){
        var newDate = e.target.value;
        this.setState({date: newDate});
    }
     onMonthChangeHandler(e){
        var newMonth = e.target.value;
        this.setState({month: newMonth});
    }
     onYearChangeHandler(e){
        var newYear = e.target.value;
        this.setState({year: newYear});
    }   
    
    onCurrencyChangeHandler(e){
        var newCurrency = e.target.value;
        this.setState({SelectValue: newCurrency});
        console.log('currency change', this.state.SelectValue);
    }
    
     onsubmithandler(e){
     console.log('submit')   
     const date = this.state.date;
     const month = this.state.month; 
     const year = this.state.year;

     const URL = "https://api.privatbank.ua/p24api/exchange_rates?json&date=" + date + "." + month + "." + year;
        
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
     
    
       fetch(proxyUrl + URL).then(res => res.json()).then(json => {
      this.setState({ result: json.exchangeRate });
    });
         
          console.log('fetched!') 
    
 }
  render() {
    return (
      <div className="App">
        <DateInput SelectValue = {this.state.SelectValue} onDateChangeHandler = {this.onDateChangeHandler} onMonthChangeHandler = {this.onMonthChangeHandler} onYearChangeHandler = {this.onYearChangeHandler} onCurrencyChangeHandler = {this.onCurrencyChangeHandler} onsubmithandler= {this.onsubmithandler}/>
        <ResultContainer SelectValue = {this.state.SelectValue} date={this.state.date} month={this.state.month} year={this.state.year} result={this.state.result}/>
      </div>
    );
  }
}

export default App;
