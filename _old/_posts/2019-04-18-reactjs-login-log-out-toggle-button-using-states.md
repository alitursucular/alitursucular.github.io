---
title: "ReactJS Login / Log Out toggle button using states"
date: 2019-04-18
tags: [React, toggle button, states, JavaScript, binding, methods, JSX, git, GitHub]
excerpt: "React is a modern way of dealing with the view layer by creating reusable UI components. This project is about building a toggle button using states. This is a fairly simple project but, still a good exercise. The collective knowledge of fundamental concepts enables us to deal with complex projects."
---

Here is the [demo](https://alitursucular.github.io/reactjs-toggle-button-with-states-demo/) and [GitHub repository](https://github.com/alitursucular/reactjs-toggle-button-with-states-demo).

React is a modern way of dealing with the view layer by creating reusable UI components. As I mentioned in my other React related posts, there are a few reasons why I prefer to use React. First of all, it is fast. It can handle complex updates very quickly. Apps that have a lot of changing data is where you actually realize the beauty (At this point it is very clear why Facebook needed to develop React). Secondly, React is modular and scalable. It enables you to have smaller and reusable files rather than having dense files of code. Lastly, React happens to be popular! There are many projects out there that use React. Although many of them don't require the power of React, people are still using it to explore and understand it for further use. [Here](https://reactjs.org/tutorial/tutorial.html) is the official url where, you could start exploring.

My below project is about building a toggle button using states. This is a fairly simple project but, still a good exercise. The collective knowledge of fundamental concepts enables us to deal with complex projects.

**_Bonus:_** _Also see my post about [Fetching data from a RESTful API using Fetch API with React](https://alitursucular.github.io/fetching-api-data-with-reactjs/)_

I will not dive into details of React structure but, it is important to mention that `state`is a JavaScript object and it holds an information where, can only be managed within the React component. So let's see our first method and explain further:

```javascript
constructor(props) {
    super(props);
    this.state = {
      login: true
    };
    this.changeState = this.changeState.bind(this);
  }
```

A React component decides its own state. To make a component have state, we give the component a state property. This property should be declared inside of a constructor method as shown above. Notice that, there is JavaScript `bind()`method is used in our constructor method. Due to the way that event handlers are bound in JavaScript, _this.changeState()_ loses its _this_ when it is used in the rendor method (we will see the rendor method below). Therefore, we must bind _this.changeState_ to _this_.

A component can do more than just read its own state. A component can also change its own state. State object only gets updated by `setState()` by scheduling an update to a component’s state object. So when the state change is triggered, the component responds by re-rendering. Here is how it looks:

```javascript
changeState = () => {
    this.setState({
      login: !this.state.login
    });
  };
```

What we actually do here is to set the new state to the opposite of the current state. We will later on use this variable to change our buttons CSS so, the toggle will be visible on the screen. So finally, let's see our render method:

```javascript
render() {
    const { login } = this.state;
    return (
      <div className="App-body">
        <button
          type="button"
          className={login ? "btn-primary" : "btn-danger"}
          onClick={this.changeState}
        >
          {login ? " Login" : " Log Out"}
        </button>
      </div>
    );
  }
```

Our user triggers this click event by clicking on a `<button></button>` where, the event is being listened for by the _onClick attribute_. When this event occurs, it calls the event handler function which, is `this.toggleMood`. Inside of the body of the event handler, this.setState() is called and the component’s state is changed.

**_Bonus:_** _Also see my post about [Fetching data from a RESTful API using Fetch API with React](https://alitursucular.github.io/fetching-api-data-with-reactjs/)_

Thanks for reading! Please feel free to contact me and share your thoughts.

Here is the [demo](https://alitursucular.github.io/reactjs-toggle-button-with-states-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/reactjs-toggle-button-with-states-demo).