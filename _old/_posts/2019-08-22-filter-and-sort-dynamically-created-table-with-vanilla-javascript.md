---
title: "Filter and sort a dynamically created table with Vanilla JavaScript"
date: 2019-08-25
tags:
  [
    Filter,
    Sort,
    ES6,
    Dynamic Table,
    Higher Order Functions,
    Vanilla JavaScript,
    Bootstrap,
    HTML5,
    CSS3,
    git,
    GitHub,
  ]
excerpt: "This mini Vanilla JS project is about dynamically creating a table, which is filterable and sortable. We managed to perform these operations by resorting to several amazing JavaScript higher-order functions."
---

Here is the [demo](https://alitursucular.github.io/filter-and-sort-dynamically-created-table-with-vanilla-javascript-demo/) and [GitHub repository](https://github.com/alitursucular/filter-and-sort-dynamically-created-table-with-vanilla-javascript-demo).

**Overview**

This mini Vanilla JS project is about dynamically creating a table, which is filterable and sortable. We managed to perform these operations by resorting to several amazing JavaScript higher-order functions.

From time to time, I enjoy dealing with this kind of projects because these kinds of functions are always handy when we are dealing with a larger project (as they are being part of it). Besides, once we shift our focus to mini-projects, we generally practice & improve our skills, discover extended use cases and produce our code in various forms. Before we jump into the code, let's list what we have in this mini Vanilla JS project:

- Dynamically creating a table using `order.js` as our data source.
- Making our table filterable
- Making our table sortable
- Informative _speech bubbles_ with some cool effects.
- Handling error & flashing `thead` on hover

_Note: This mini-project mainly focuses on JavaScript rather than the layout. We included Bootstrap, Font Awesome and several media queries just to have a clean UI. We will not be discussing those since it is not in the scope._

**Code Breakdown**

After creating our basic layout, let's continue with our data source, `order.js`. We have data in JSON format as if it's being fetched from an external source. In order to use our table data, we export the module, then import in `index.js` file.

Our _order.js_:

```javascript
export const orders = [
  {
    "orderId": 1000000145601,
    "purchasedOn": "2019-06-05",
    "customerName": "Ralph Clark",
    "subtotal": "£200",
    "status": "pending"
  },
  ...
  ...
  ...
  {
    "orderId": 1000000145620,
    "purchasedOn": "2019-01-21",
    "customerName": "Georgina Thompson",
    "subtotal": "£309",
    "status": "completed"
  }
];
```

And we import it as:

```javascript
import { orders } from "./orders.js";
```

> The static import statement is used to import bindings which are exported by another module. Imported modules are in strict mode whether you declare them as such or not. The import statement cannot be used in embedded scripts unless such script has a type="module".

As it is stated in [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), we include the _type_ to our script tag in HTML:

```javascript
<script type="module" src="js/index.js" />
```

**Speech Bubbles:**

Before we jump into the table creation, let's take a look at how we manage speech bubbles. We have two speech bubbles on our page. Their only responsibility is to point out an action that the user can take. The one points to the input field (on the left) only swings. However, the one on the right has two _EventListener_ s attached, _mouseover_ and the _mouseout_. Once mouseover event is triggered, we simply add a class to the _thead_ element of our table. This class makes a flash effect over _thead_ twice to inform users that they can sort those columns. Both swing and flash effects are coded in pure _CSS_ with the help of _@keyframes_.

**Creating Table:**

```javascript
orders.forEach(order => {
  const values = Object.values(order);
  let row = tbody.insertRow(-1);
  row.className = "order";

  for (const value of values) {
    let cell = row.insertCell();
    switch (value) {
      case "pending":
        cell.className = "text-warning order-item";
        break;
      case "processing":
        cell.className = "text-info order-item";
        break;
      case "completed":
        cell.className = "text-success order-item";
        break;
      default:
        cell.className = "order-item";
    }
    cell.innerHTML = value;
  }
});
```

The logic of the above code is as follows:

1. Loop through the imported data,
2. Make an array of values from each order (remember, each order has 5 key/value pairs),
3. Insert a new row to tbody as the last row and give a class name of _order_,
4. Loop through values of the current order, insert a cell for each, add their classes and, finally set the content.

Along with the logic, there is also a _switch statement_ in the for/of statement. That statement is responsible for the addition of proper UI classes. Since we know all _status types_ of orders, we style them accordingly. Lastly, other than Bootstrap text classes, we add an _order_ class for each row and _order-item_ class for each cell. These classes will be used in filter and sort functions.

**Filter Function:**

```javascript
let filterInput = document.querySelector(".filter-input");
const order = document.querySelectorAll(".order");

filterInput.addEventListener("keyup", () => {
  let criteria = filterInput.value.toUpperCase().trim();
  let j = 0;

  order.forEach(data => {
    thead.style.opacity = "1";
    err.style.display = "";
    speechBubbleRight.style.visibility = "";
    if (data.innerText.toUpperCase().indexOf(criteria) > -1) {
      data.style.display = "";
    } else {
      data.style.display = "none";
      j++;
      if (j === order.length) {
        thead.style.opacity = "0.2";
        err.style.display = "flex";
        speechBubbleRight.style.visibility = "hidden";
      }
    }
  });
});
```

The logic of the filter function is as follows:

1. Get the input element and every row that has order class within the HTML,
2. Convert to uppercase and remove white spaces,
3. Add an EventListener to the input and execute the filter function,
4. For each row: get innerHTML, convert to uppercase and look for a match (index) of the given input,
5. Add style of _display: none;_ for each mismatch. (We will use the help of this class in sort too)
6. If nothing matches, display the error message and hide the speech bubble on the right. (Since there is nothing to be sorted).
7. Reset these helper styles to defaults on each iteration.

**Sort Function:**

```javascript
let sortDirection;

th.forEach((col, idx) => {
  col.addEventListener("click", () => {
    sortDirection = !sortDirection;
    /** Remember:
     * We obtained all tr elements that has 'order' class before!
     * However, querySelectorAll returns a NodeList, not an Array.
     * While forEach method can be used on NodeLists, filter method cannot.
     * This is why we preferred to make this conversion below; where we actually need an array to filter.
     * Note: NoteList is very similar to array and easy to convert.
     **/
    const rowsArrFromNodeList = Array.from(order);
    const filteredRows = rowsArrFromNodeList.filter(
      item => item.style.display != "none"
    );

    filteredRows
      .sort((a, b) => {
        return a.childNodes[idx].innerHTML.localeCompare(
          b.childNodes[idx].innerHTML,
          "en",
          { numeric: true, sensitivity: "base" }
        );
      })
      .forEach(row => {
        sortDirection
          ? tbody.insertBefore(row, tbody.childNodes[tbody.length])
          : tbody.insertBefore(row, tbody.childNodes[0]);
      });
  });
});
```

For some reason, I enjoyed coding this sort function very much. Almost every approach on the internet is based on comparing one row after another in for and while loops (including w3schools). However, my approach was to chain _sort_ and _forEach()_ methods to get the desired output. Let's go over the function:

1. We have a _click_ EventListener for each _th_ element, so we would know which column to sort, (thanks to the _idx_ parameter)
2. On each click, we reverse the sort direction with the help of _sortDirection boolean_,
3. We make an array of rows that has 'order' class and whose style is NOT 'none'. (This is because the user may have filtered before and, wants to sort afterward).
4. Here comes the combined power of _sort_ and _localeCompare_. We pass a and b parameters as if they are two elements to be compared in the selected column. LocaleCompare accepts two strings to be compared. Therefore, we access the actual values for that row and return the result. It is important to note that, we added a couple more parameters to the localeCompare to have a proper working sort function. (`"en", { numeric: true, sensitivity: "base" }`).
5. Lastly, chained _forEach()_ method loops through each sorted row and inserts them one after another by moving the current node to a new position (depending on the sortDirection we set above).

_See my other posts: [Spotify Playlists Quiz with React](https://alitursucular.github.io/spotify-playlists-quiz-with-react/)_ and _[Fetching data from a RESTful API using Fetch API with React](https://alitursucular.github.io/fetching-api-data-with-reactjs/)_

**Further Developments**

- **Multiple filter arguments:** Our filter function looks for the exact match of the given input. For now, it is not a problem since our data set consists of only 15 rows. However, it can get messy. Let's assume that we need the id of customer James, who spent £380. Our best approach would be to type either _James_ or _£380_. Searching by James will return only 2 rows and, it easy to see which row has £380 in subtotal. However, what if our data set had thousands of rows and hundreds of customers named James? Since our algorithm doesn't accept multiple arguments, our code is not the most ideal code to be used in huge data sets.
- **Sort icons:** Depending on ascending/descending, the general sort icon could be changed to a directional icon.
- **Sort type:** Rather than clicking on table headers, we could place dropdown buttons to easily select the sort type. By doing so, we could create more / custom sorting options for each column.
- **Error messages:** As it is discussed above, we currently inform the user with _No results were found..._ error text. Along with doing so, we can also add a helper function, which provides suggestions. (For example: _Did you mean 'James' ?_ or _Try again with shorter filter text_ etc.)
- **Fetching data:** Basically, this could be one of the best improvements for this project. In real life, we get data from external sources. To achieve that, the first step would be to use a _fake online REST API for testing and prototyping_ service such as [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Once we successfully implement it, we can create our own REST microservice as a second step.

Here are several references and great reads related to this project:

- [HTMLCollection, NodeList and array of objects](https://hackernoon.com/htmlcollection-nodelist-and-array-of-objects-da42737181f9)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Looping through objects in JavaScript](https://zellwk.com/blog/looping-through-js-objects/)
- [JavaScript Array sort() Method (w3schools.com)](https://www.w3schools.com/jsref/jsref_sort.asp)
- [String.prototype.localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
- [How TO - Sort a Table (w3schools.com)](https://www.w3schools.com/jsref/jsref_sort.asp)
- [YouTube - Build A Filterable List With Vanilla JavaScript](https://www.youtube.com/watch?v=G1eW3Oi6uoc)
- [Bubbly](https://leaverou.github.io/bubbly/)

Thank you for reading! Your thoughts and comments are always welcome.

Here is the [demo](https://alitursucular.github.io/filter-and-sort-dynamically-created-table-with-vanilla-javascript-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/filter-and-sort-dynamically-created-table-with-vanilla-javascript-demo).
