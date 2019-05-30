---
title: "Spotify Playlists Quiz with React"
date: 2019-05-29
tags:
  [
    React,
    Bootstrap,
    HTML5,
    CSS3,
    React,
    components,
    JSX,
    git,
    GitHub,
    DOM,
    virtual DOM,
    Spotify API,
    Single Page Application (SPA),
  ]
excerpt: "This React app generates a simple quiz based on user's Spotify playlists. It features connecting to Spotify Web API, accessing provided data, extracting useful information from that data and generating multiple choice questions."
---

Here is the [demo](https://alitursucular.github.io/spotify-playlists-quiz-with-react-demo/) and [GitHub repository](https://github.com/alitursucular/spotify-playlists-quiz-with-react-demo).

**Short introduction to React**

React is one of the most popular JavaScript libraries for interactive web applications. It enables developers to create reusable UI components and eases to deal with the view layer. It can handle complex updates in applications by _manipulating the DOM_ if necessary. By definition, DOM manipulation is the heart of the modern, interactive web. However, updating DOM is a lot slower than many JavaScript operations. That creates a problem. Especially if we are dealing with huge amounts of DOM manipulation.

**Scope of our App**

This app generates a simple quiz based on user's Spotify playlists. Obviously, React relies at the heart of this project. Our fundamental focus was to create a single page React application with below features:

- Connecting to Spotify Web API,
- Accessing provided data,
- Extracting useful information from that data,
- Generating multiple choice questions.

**App structure (components and functions)**

```bash
- functions
    - prepareQuestionsFunctions
    - spotifyFunctions
- App.js
    - LoginOrGreeting
        - AccountLogin
        - Greeting
    - GetUserPlaylists
    - GetPlaylistTracks
    - CreateQuestions
        - Score
        - QuestionsContainer
        - Result
```

Each component has its own _CSS_ file. Although it is super useful, we didn't prefer to use _CSS modules_, since our app did not require to have unique classnames for every component. By definition, CSS Modules let us use the same CSS class name in different files without worrying about naming clashes. [More info here](https://css-tricks.com/css-modules-part-1-need/).

Let's begin with our main component `App.js`. We will analyze the rest in the _components breakdown_ section. This component is the mother of all components. It has one and only resposibility: control the app flow! It is done via _receiving props_ and _callback props_ (react way of passing actions from parent to children).

Here is the flow logic of App.js:

1. Render an unchanged header and a footer regardless of the app logic.
2. Render `<LoginOrGreeting />` and receive App's _isLogged_ and _token_ states.
3. If _islogged_ is true, render `<GetUserPlaylists />`, pass token as props and expect playlist id. Update _selectedPlaylist_ state in the callback.
4. If playlist id is received, render `<GetPlaylistTracks />`, pass token + selectedPlaylist as props and expect tracks array. Update _tracks_ state in the callback.
5. If tracks array has a length, render `<CreateQuestions />`, pass tracks array as props. (Last component doesn't have a callback).

**Spotify Web API**

Spotfiy has a list of libraries for integrating with the Spotify Web API using several programming languages and platforms. We used [jmperez/spotify-web-api-js](https://github.com/jmperez/spotify-web-api-js) JavaScript library for this project. We first made a node installation and then instantiate the wrapper.

```bash
npm install -S spotify-web-api-js
```

```javascript
const spotifyWebApi = new Spotify();
```

After setting up the environment, we coded our own functions on top of this library. All functions are collected in a single file named `spotifyFunctions.js`. We accessed them with _import_ in which component we need:

```javascript
import * as spotifyFunctions from './functions/spotifyFunctions.js';

// Example usage:
...
...
spotifyFunctions.setAccessToken(...);
spotifyFunctions.getUserPlaylists();
spotifyFunctions.getSimplePlaylistTracks(...);
...
...
```

As it is stated in _App structure_ section, several components share the work load of fetching data & getting useful information out of it. Thus, these components actually become an individual app itself. This is one of the beauties of React, if we ever need to use Spotify user playlists information for some other project, we only need that component and the Web API wrapper (reusable components).

**Components breakdown**

- **LoginOrGreeting Component:** This component acts as a container for the login screen and greeting. It is the very first component that App.js renders. Initially, _isLogged_ and _accessToken_ states are false and null. Therefore, it first renders `<AccountLogin/>`. Its main responsibility is to decide which component to render and report this to its parent, App.js.

- Once AccountLogin component renders, we obtain an ugly URL that contains our _access_token_. In our _componentDidMount method_, we parse this URL and set it to state (along with isLogged state). At this moment, since we are logged in, our component renders `<Greeting />` and passes _accessToken_ props to it.

- Note: If we can't obtain the URL, we won't have access_token. Therefore, our component would render `<AcountLogin />` again. However, this is not an endless loop! Since the generated link in `<AcountLogin />` makes the actual login request to Spotify, it has to be clicked by the user.

```javascript
class LoginOrGreeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      accessToken: null
    };
  }

  componentDidMount() {
    const accessToken = spotifyFunctions.spotifyAccessTokenAuth();
    if (accessToken) {
      this.setState({
        isLogged: true,
        accessToken: accessToken
      });
      this.props.myState(true);
      this.props.myToken(accessToken);
    } else {
      this.setState({
        isLogged: false,
        accessToken: null
      });
      this.props.myState(false);
      this.props.myToken(null);
    }
  }

  render() {
    return !this.state.isLogged ? (
      <AccountLogin />
    ) : (
      <Greeting accessToken={this.state.accessToken} />
    );
  }
}

export default LoginOrGreeting;
```

- **AccountLogin Component:** This simple presentational component mainly renders the login screen HTML. It is a child of <LoginOrGreeting /> and it's main responsibility is to make a login request to Spotify on user click. We see this component in action if:
  1. User logs in for the first time.
  2. Login is unsuccessfull.
  3. Spotify session expired. (We currently do not have a condition for that)

```javascript
class AccountLogin extends Component {
  render() {
    return (
      <div className="col-md-12 AccountLogin">
        <div className="col-md-12">
          <h5 className="mb-5 mt-2">
            This app generates a simple quiz based on your Spotify playlists.
          </h5>
        </div>
        <div className="col-md-12">
          <img
            src={react_logo}
            className="AccountLogin-logo-react"
            alt="logo"
          />
          <img src={add} className="AccountLogin-add-sign" alt="logo" />
          <img
            src={spotify_logo}
            className="AccountLogin-logo-spotify"
            alt="logo"
          />
        </div>
        <div className="col-md-12 mt-5 mb-3">
          <a
            className="btn AccountLogin-link"
            href={spotifyFunctions.fromLoginUrl()}
          >
            Login to Spotify
          </a>
        </div>
        <p>
          <small className="AccountLogin-warning-note">
            <i>
              We will request authorization from Spotify only to view your
              <b>name</b>, <b>playlists</b> and their <b>tracks</b>.<br />
              None of this information will be recorded or shared with third
              parties.
            </i>
          </small>
        </p>
      </div>
    );
  }
}

export default AccountLogin;
```

- **Greeting Component:** This is another simple component and a child of `<LoginOrGreeting />`. It renders the welcome message. In addition to that, it displays how many playlists found in users Spotify account. (\*Note that, we could split this component further. Currently, it does not only render the HTML, but also fetches _name_, _surname_ and _number of playlists_ through its _lifecycle method_).

```javascript
class Greeting extends Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      playlistCount: 0,
      username: ""
    };
  }

  isMoreThanOne = () => {
    const playlistCount = this.state.playlistCount;
    return playlistCount > 1 ? "s" : "";
  };

  async componentDidMount() {
    await spotifyFunctions.setAccessToken(this.props.accessToken);
    const playlists = await spotifyFunctions.getUserPlaylists();
    const bulkUserData = await spotifyFunctions.getUsername();

    this.setState({
      username: bulkUserData.display_name,
      playlistCount: playlists.length
    });
  }

  render() {
    return (
      <div className="col-md-12 mt-5 Greeting">
        <h2 className="mb-4">
          Hello <span>{this.state.username}</span>!
        </h2>
        <p className="mb-4">
          We found
          <span>
            {this.state.playlistCount} playlist{this.isMoreThanOne()}
          </span>
          in your Spotify account.
          <br />
          Choose one from the following dropdown menu and start your quiz!
        </p>
      </div>
    );
  }
}

export default Greeting;
```

- **GetUserPlaylists Component:** `<GetUserPlaylists />` is triggered by _isLogged_ state in App.js (its parent) Its responsibilities are:
  1. Getting user playlists from Spotify.
  2. Displaying them in a form of HTML select element.
  3. Making a callback to its parent for the selected playlist id.
  4. Staying alert for playlist changes made by the user, and repeat above.

```javascript
class GetUserPlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      selectedPlaylist: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      selectedPlaylist: e.target.value
    });
    this.props.myPlaylist(e.target.value);
  }

  async componentDidMount() {
    await spotifyFunctions.setAccessToken(this.props.myToken);
    const playlists = await spotifyFunctions.getUserPlaylists();
    this.setState({
      playlists: playlists
    });
  }

  renderListItems = () => {
    const playlistItems = this.state.playlists.map(o => (
      <option key={o.id} value={o.id}>
        {o.playlistName}
      </option>
    ));
    return playlistItems;
  };

  render() {
    return (
      <select className="form-control" onChange={this.handleSelect}>
        <option key="0" value="">
          Choose your playlist!
        </option>
        {this.renderListItems()}
      </select>
    );
  }
}

export default GetUserPlaylists;
```

- **GetPlaylistTracks Component:** This component is a pure container component. It has nothing to render so, it is not responsible for any type of UI presentation. It receives accessToken and the selected playlist as props from its parent App.js. It's resposibilities are:
  1. Get all tracks of the selected playlist.
  2. Clean this tracklist data and set state.
  3. Return this clean array of tracks to the parent,
  4. Be responsive for playlist changes (if props changes), and repeat above.

```javascript
class GetPlaylistTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistTracks: []
    };
  }

  async fetchTracks(receivedPlaylistId) {
    const RAWplaylistTracks = await spotifyFunctions.getSimplePlaylistTracks(
      receivedPlaylistId
    );
    const CLEANtracksList = RAWplaylistTracks.map(
      o => o.artistName + "+" + o.albumName + "+" + o.trackName
    );

    this.setState({
      playlistTracks: CLEANtracksList
    });
    this.props.myTracks(this.state.playlistTracks);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.myPlaylist !== this.props.myPlaylist) {
      this.fetchTracks(this.props.myPlaylist);
    }
  }

  async componentDidMount() {
    await spotifyFunctions.setAccessToken(this.props.myToken);
    this.fetchTracks(this.props.myPlaylist);
  }

  render() {
    return null;
  }
}

export default GetPlaylistTracks;
```

- **CreateQuestions Component:** `<CreateQuestions />` itselft a container component that manages 3 more child _presentational components_ written as _stateless functional components_. It's responsibilities are:
  1. Receive _myTracks_ props and pass this tracks array to `prepareQuestions` function. (and set state regarding to returned data)
  2. Manage _correct_, _incorrect_ state values and pass props to `<Score />` for display.
  3. Pass props to `<QuestionsContainer />` and invoke a callback function when user clicks an answer (onChange event).
  4. Calculate number of remaining questions (the _current_ state), correct / incorrect states.
  5. Manage `<Result />` and pass the _correct_ state as props. Result component uses _props.correct_ to decide which type of result to display once user finishes the quiz. Moreover, Result component has a `start over?` button. Buttons _onClick event attribute_ is attached to a callback function on its parent `<CreateQuestions />`, where invokes lifecycle method to request new set of questions for the same playlist.

_See my other React posts: [Fetching data from a RESTful API using Fetch API with React](https://alitursucular.github.io/fetching-api-data-with-reactjs/)_ and _[Using React with Bootstrap (react-bootstrap)](https://alitursucular.github.io/using-react-with-bootstrap/)_

**Notes, Bugs & References / Reads**

* There is too much passing props back and forth. We could think of using [React Context API](https://reactjs.org/docs/context.html). Context provides a way to pass data through the component tree without having to pass props down manually at every level.
* As we discussed above, App.js is responsible for the main app flow. It handles the flow by props and callbacks. We could use _Redux_ as the state container.
* We could separate our components further. It would allow them to be more reusable and understandable for developer fellows.
* We are aware that there are some bugs in the generated questions. Especially for `prepareQuestionsFunctions.js`:
    1. It does not look for duplicates. i.e.: Imagine a playlist consists of only Metallica songs. In that case, "Who / which group sings....?" question will always have the same answer.
    2. It does not check for 'undefined'. It is possible to have undefined answers in questions.
    3. It does not check number of tracks in the selected playlist. This could cause duplicate questions or same answers. Since we are selecting 10 random indexes from the playlist, any playlist with less than 10 tracks would have duplicate indexes. We may experience this duplication either in questions or answers.

Despite the above-mentioned facts, we didn't proceed any further with them because it is not in the scope of this project. We mainly focused on receiving data and displaying it using the React environment.

Here are several references and great reads related to this project:

* Passing information to nested components (React.context) [Link](https://stackoverflow.com/questions/48157223/how-to-pass-information-to-nested-components-in-react).
* Updating parent state from a child component [Link](https://stackoverflow.com/questions/35537229/how-to-update-parents-state-in-react).
* Query-string [Link](https://www.npmjs.com/package/query-string).
* Async function vs. a function that returns a promise [Link](https://dev.to/mywebstuff_hq/async-function-vs-a-function-that-returns-a-promise-3lpo).
* Good approach React & Spotify Shuffle Blog [Link](https://hackernoon.com/build-a-react-shuffle-blog-using-the-spotify-api-d5498d47c47b).
* Spotify referred Web API Wrapper [Link](https://github.com/jmperez/spotify-web-api-js).
* Derive states from props [Link 1](https://stackoverflow.com/questions/32414308/updating-state-on-props-change-in-react-form), [Link 2](https://alligator.io/react/get-derived-state/).
* Presentational vs. container components [Link](https://flaviocopes.com/react-presentational-vs-container-components/).
* React Router [Link](https://codeburst.io/getting-started-with-react-router-5c978f70df91).

Thank you for reading! I would be happy to hear your thoughts and comments.

Here is the [demo](https://alitursucular.github.io/spotify-playlists-quiz-with-react-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/spotify-playlists-quiz-with-react-demo).
