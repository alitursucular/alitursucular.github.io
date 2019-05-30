---
title: "Using React with Bootstrap (react-bootstrap)"
date: 2019-05-12
tags:
  [
    React,
    Bootstrap,
    HTML5,
    CSS3,
    react-bootstrap,
    components,
    JSX,
    git,
    GitHub,
    CSS Framework,
    DOM,
    virtual DOM,
    bootstrap grid
  ]
excerpt: "This project is only about adding Bootstrap to React (integrating Bootstrap with React apps) and creating a basic grid for further projects. I will not be discussing about React basics like i did in my other posts."
---

Here is the [demo](https://alitursucular.github.io/using-react-with-bootstrap-demo/) and [GitHub repository](https://github.com/alitursucular/using-react-with-bootstrap-demo).

**Introduction**

This project is only about adding Bootstrap to React (integrating Bootstrap with React apps) and creating a basic grid for further projects. I will not be discussing about React basics like i did in my other posts _[Fetching data from a RESTful API using Fetch API with React](https://alitursucular.github.io/fetching-api-data-with-reactjs/)_ and _[ReactJS Login / Log Out toggle button using states](https://alitursucular.github.io/reactjs-login-log-out-toggle-button-using-states/)_

React is one of the most popular JavaScript libraries for interactive web applications. It enables developers to create reusable UI components and eases to deal with the view layer. It can handle complex updates in applications by _manipulating the DOM_ if necessary. By definition, DOM manipulation is the heart of the modern, interactive web. However, updating DOM is a lot slower than many JavaScript operations. That creates a problem. Especially if we are dealing with huge amounts of DOM manipulation. So, how does React overcome this issue?

In React, for every _DOM object_, there is a corresponding _"virtual DOM object."_ A virtual DOM object is a representation of a DOM object, like a lightweight copy. Manipulating the DOM is slow. Manipulating the virtual DOM is much faster, because nothing gets drawn onscreen. When we render a _JSX element_, every single virtual DOM object gets updated. Once the virtual DOM has updated, then React compares the virtual DOM with a virtual DOM snapshot that was taken right before the update. Therefore, React figures out exactly which virtual DOM objects have changed. After this comparison, React knows which virtual DOM objects have changed so, it only updates those objects in the _real DOM_. (changes on the real DOM results the screen to change).

**React Bootstrap**

_Bootstrap_ is one of the most popular _CSS Frameworks_ for developing responsive and mobile-first websites. If we need to use React with Bootstrap, we cannot simply include a 'ready to go' script to our pages and start using. The [official documentation of React](https://facebook.github.io/create-react-app/docs/adding-bootstrap) clearly explains how we can add Bootstrap:

> While you don’t have to use any specific library to integrate Bootstrap with React apps, it's often easier than trying to wrap the Bootstrap jQuery plugins. **React Bootstrap** is the most popular option that strives for complete parity with Bootstrap. **reactstrap** is also a good choice for projects looking for smaller builds at the expense of some features.

As it is mentioned in the above, _npmtrends.com_ has a very useful [statistics](https://www.npmtrends.com/react-bootstrap-vs-reactstrap) for preference among _React Bootstrap_ and _reactstrap_. After a little bit more digging, I decided to use [React Bootstrap](https://react-bootstrap.github.io/) and make myself a grid base. So, let's begin by creating a React app:

```bash
npx create-react-app using-react-with-bootstrap
```

After we successfuly create our folder with _create-react-app_ installed, we navigate to the folder and install _react-bootstrap_ and _bootstrap_ itself:

```bash
cd using-react-with-bootstrap
npm install react-bootstrap bootstrap
```

We are almost there! React Bootstrap is not shipped with Bootstrap CSS. Therefore, we include our styles manually. As it is mentioned in their documentation, the easiest way is to include the latest styles from the CDN. In our app folder, we navigate to `public > index.html` and add the following:

```html
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
```

Now, it is time to import some Bootstrap components. Below code shows how to add a single or multiple components. In our `src > App.js` file, we import:

```javascript
// Single component:
import Container from "react-bootstrap/Container";

// Multiple components:
import { Container, Row, Col } from "react-bootstrap";
```

Lastly, in our terminal we type:

```bash
npm start
```

It runs the app in development mode. Simply go to: _http://localhost:3000_ to view it in the browser. (The page will automatically reload if we change the code and save).

For the sake of this blog post, I recreated **Bootstrap 4.1 Grid Example** docs page in React. Both links are available below.

Thank you for reading! I would be happy to hear your thoughts and comments.

_See my post about [Fetching data from a RESTful API using Fetch API with React](https://alitursucular.github.io/fetching-api-data-with-reactjs/)_

_See my post about [ReactJS Login / Log Out toggle button using states](https://alitursucular.github.io/reactjs-login-log-out-toggle-button-using-states/)_

Here is my [demo](https://alitursucular.github.io/using-react-with-bootstrap-demo/) built with React.

Here is the original [Bootstrap 4.1 grid example](https://getbootstrap.com/docs/4.1/examples/grid/).

Here is the [GitHub repository](https://github.com/alitursucular/using-react-with-bootstrap-demo).
