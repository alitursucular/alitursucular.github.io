---
title: "Fetching data from a RESTful API with React (Fetch API)"
date: 2019-04-16
tags:
  [
    Fetch API,
    reactJS,
    states,
    DOM,
    virtual DOM,
    create-react-app,
    JavaScript,
    ES6,
    git,
    GitHub,
  ]
excerpt: "This project simply shows fetching data from a RESTful API (https://exchangeratesapi.io/). Once data is fetched, we filter our results and create a dynamic table element to display."
---

Here is the [demo](https://alitursucular.github.io/fetching-api-data-with-reactjs-demo/) and [GitHub repository](https://github.com/alitursucular/fetching-api-data-with-reactjs-demo).

As I mentioned in my other React related posts, there are a few reasons why I prefer to use React. It is fast, modular and scalable. It enables you to have smaller and reusable files rather than having dense files of code. There are many projects out there that use React. Although many of them don't require the power of React, people are still using it to explore and understand it for further use. [Here](https://reactjs.org/tutorial/tutorial.html) is the official url where, you could start exploring.

This project simply shows fetching data from a RESTful API (_https://exchangeratesapi.io/_). This foreign exchange rates API allows us to retrieve current and historical foreign exchange rates published by the European Central Bank. Although, there are many types of queries mentioned on their website, we will be using `latest?base=GBP` as for the _query string_ to keep this project simple. (Note that, base currency is set to GBP so, other listed currencies are based on GBP). Since we are bringing in a real world data and playing with it, I consider this project is a bit more complex than staying in the local environment. Once data is fetched, we filter our results and create a dynamic _table_ element to display.

**_Bonus:_** _Also see my post about [ReactJS Login / Log Out toggle button using states](https://alitursucular.github.io/reactjs-login-log-out-toggle-button-using-states/)_

React has powerful methods called _Lifecycle methods_. These methods get called at certain moments in a component’s life. For our case, `componentDidMount` method is a good place to connect a React app to external applications, such as web APIs or JavaScript frameworks. Here is how our method looks like:

```javascript
componentDidMount() {
  alert('I am just mounted!');
}
```

We place our fetching script into the above method. It is the easiest way to get _JSON Object_ in React from an API:

```javascript
constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {}
    };
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=GBP") // data source is an object, not an array.
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            rates: result.rates
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
```

If we are dealing with states, we always have a constructor method to set the initial state. In our project, we are storing not only the fetched data but also, loading and error states. These extra properties will be used in our `render` method for the sake of _UX_. Since our data arrives asynchronously, it would be a good idea to show a text or a spinning visual to the end user during the wait time.

Notice that, we are using `setState` to update our components state. In other words, we are using an external source to set our component's local state! When the data is fetched successfully, it will be stored in the local state. Before we go through our `render` method, let's take a look at how we process the fetched data for display:

```javascript
createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map(i => rates[i])[2];
    let table = [];
    let children = [];
    let displayedCurrencies = ["RUB", "CAD", "USD", "CHF", "JPY", "EUR"];

    // The following loop is used to create inner structure (children) of the table.
    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.prettyCurrency(ratesArr[key], 0)}</td>
            <td>{this.prettyCurrency(ratesArr[key])}</td>
            <td>{this.prettyCurrency(ratesArr[key], 1)}</td>
          </tr>
        );
      }
    }
    table.push(<tbody>{children}</tbody>); // We create the parent tbody tags and add the inner loop (children).

    return table;
  };
```

The above function is called by the _render_. In this function, we use `Object.keys()` method to return the array of our object's property names. We also define several empty arrays and array of currencies which, we wish to display. Later on, we loop through _ratesArr_ along with the condition and create `<tr>....</tr>` pairs for each found value. These found pairs are than pushed to _children_ and finaly returned to the _render_. Notice that, there is another function called `prettyCurrency`. Since this project simulates an _Exchange Office_ business, I simply did the 'buy less, sell more' calculation so, the business can make money! Here is the function:

```javascript
prettyCurrency = (crr, action) => {
    if (action === 0) {
      crr = (crr * 102) / 100;
    } else if (action === 1) {
      crr = (crr * 98) / 100;
    } else {
      // Do nothing...
    }
    var fixedCrr = crr.toFixed(4).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = "0" + fixedCrr;
    }

    return fixedCrr;
  };
```

Lastly, it is time to render our component. Let's see the code first and we talk about it:

```javascript
render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div className="App-body">
            <table className="currencyTable">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>WE BUY</th>
                  <th>EXCHANGE RATE</th>
                  <th>WE SELL</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
            <p>
              * base currency is GBP
              <br />* As for the API,
              <a href="https://exchangeratesapi.io/">https://exchangeratesapi.io/</a> is used.
            </p>
          </div>
        </main>
      );
    }
  }
```

Our render method first checks for the error property of the component's state. If there is an error, `error.message` stores the problem. (Notice that, `{ ... }` expression is used to inject _JSX_ into _HTML_ in React). Please recall the wait time mentioned above. I simply print a loading text during this wait time. By doing so, the end user is kept informed while the data is being fetched. Once the error is _null_ and isLoaded is _true_, I create the body of the HTML and display our data.

**_Note:_** _This is the most basic block of code for fetching a data from an external source in React. Most larger requests and further processings have a similar core._

**_Bonus:_** _Also see my post about [ReactJS Login / Log Out toggle button using states](https://alitursucular.github.io/reactjs-login-log-out-toggle-button-using-states/)_

Thank you for reading! I would be happy to hear your thoughts and comments.

Here is the [demo](https://alitursucular.github.io/fetching-api-data-with-reactjs-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/fetching-api-data-with-reactjs-demo).