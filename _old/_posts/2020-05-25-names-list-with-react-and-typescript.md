---
title: "Names list with React and TypeScript"
header:
  image: /assets/images/names-list-with-react-and-typescript-blog-post.jpg
  og_image: /assets/images/names-list-with-react-and-typescript-social-share.jpg
tags:
  [
    React,
    Create React App,
    TypeScript,
    JavaScript,
    ES6,
    Higher Order Functions,
    Bootstrap,
    HTML5,
    SCSS,
    CSS3,
    git,
    GitHub,
    DOM,
    virtual DOM,
    Single Page Application (SPA)
  ]
excerpt: "A basic React - TypeScript app that allows users to add and remove names to and from a list. A user could also randomly pick from the list without picking the same name twice in a row."
# last_modified_at: 2020-05-27T16:00:52-04:00
---

Here is the [demo](https://alitursucular.github.io/names-list-with-react-and-typescript-demo/) and [GitHub repository](https://github.com/alitursucular/names-list-with-react-and-typescript-demo).

**Overview**

This is a basic React - TypeScript app that allows users to add and remove names to and from a list. A user could also randomly pick from the list without picking the same name twice in a row.

After my contract with Macmillan Cancer Support (London, UK) was over, I started to apply for freelance projects while searching for my next opportunity. Creating this mini-app was the Front end code test of one of my freelance applications and I was given 48 hours to complete. It wasn't a hard egg to crack, nevertheless, it was fun to practice some basics while challenging against time. Ok then, let's begin with checkpoints to be accomplished, and then dive into the code:

- The app must be developed using React and TypeScript
- User should be able to add and remove names to and from a list
- The app must have a random name pick button, and the same name should not be picked twice in a row.

It wasn't required to have any type of styling over the app, but I wanted to present my work with a clean and responsive UI :)

> I will not be covering the basics of React as I did in my other posts. Feel free to take a look at my [ReactJS Login / Log Out toggle button using states](https://alitursucular.github.io/reactjs-login-log-out-toggle-button-using-states/) post for the basic usage of states in a class component.  

**App structure**

```bash
- public
- src
    - assets
    - components
        - GitHubCorner
            - GitHubCorner.tsx
            - GitHubCorner.scss
        - Header
            - Header.tsx
            - Header.scss
        - Footer
            - Footer.tsx
            - Footer.scss
        - List.tsx
        - ListItem.tsx
        - ListError.tsx
        - PickRandomListItem.tsx
        - PickedRandomListItem.tsx
        - App.tsx
        - App.scss
    - index.tsx
    - initialNames.ts
    - types.d.ts
```

**Code Breakdown**

To begin with, the entire app is managed by `App.tsx`, and all the other components are its children. I have used `Bootstrap` only for the grid, and separate `scss` files for styling purposes. I also used `BEM` methodology to maintain my styling naming convention. Let's take a closer look at our App component to understand the flow:

```javascript
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { initialNames } from '../initialNames';
import { GitHubCorner } from './GitHubCorner/GitHubCorner';
import { Header } from './Header/Header';
import { AddListItem } from './AddListItem';
import { List } from './List';
import { PickRandomListItem } from './PickRandomListItem';
import { Footer } from './Footer/Footer';

const App: React.FC = () => {
  ...
  ...
  ...
  return (
    <>
      <div className="container">
        <div className="app mt-5 mb-4">
          <Header />
          <main>
            <div className="app_list">
              <AddListItem addName={addName} />
              <List names={names} removeName={removeName} />
            </div>
            {names.length !== 0 && (
              <PickRandomListItem pickName={pickName} pickedName={pickedName} />
            )}
            <Footer />
          </main>
        </div>
      </div>
      <GitHubCorner />
    </>
  )
}

export default App;
```

_I only put the return method of the App.tsx in the above snippet, but we will come back for states and other functions in a minute._

Our App component renders 6 components in total. `<Header />`, `<Footer />` and `<GitHubCorner />` only return the necessary UI markup for their bits without any props or state. On the other hand, `<AddListItem />`, `<List />` and `<PickRandomListItem />` deal with the data, where the UI is rendered based on their props or state. To begin with, I have created a pre-populated JSON array, each having id and text. This array of objects forms our initial state:

```javascript
import { v4 as uuidv4 } from 'uuid';

export const initialNames: Array<Name> = [
    {
        id: uuidv4(),
        text: "Monroe Vire"
    },
    {
        id: uuidv4(),
        text: "Delphine Atkins"
    },
    {
        id: uuidv4(),
        text: "Suzann Mcgarity"
    },
    {
        id: uuidv4(),
        text: "Jackie Dicus"
    },
    {
        id: uuidv4(),
        text: "Buck Brungardt"
    }
];
```

> uuidv4() generates and returns a RFC4122 version 4 UUID. I used these generated unique id's for removing names from the the list. You can get more information about this package [here](https://github.com/uuidjs/uuid).

After the import, I set it to the initial state using the `useState` hook:

```javascript
const [names, setNames] = useState(initialNames);
```

**List Component and it's children**

The above state is the first prop of our List component, where it is being passed down further to form the list UI:

```javascript
import React from 'react';
import { ListItem } from './ListItem';
import { ListError } from './ListError';

interface ListProps {
    names: Array<Name>;
    removeName: RemoveName;
}

export const List: React.FC<ListProps> = ({ names, removeName }) => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <ul>
                    <ListError names={names} />
                    {names.map((name, index) => (
                        <ListItem
                            key={index}
                            name={name}
                            removeName={removeName} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
```

As with other components, List components is also a functional component (React.FC) and it accepts props. For the sake of improved readability, I destructured the props and write my interface to define their types. Rather than declaring types _Name_ and _RemoveName_ in every component I need, I created a type declaration (types.d.ts) file and included it in the project. There is no need to import/export this type of declaration file because the compiler recognizes it.  

Our List component maps through all the names and passes each name further down to its child ListItem component to actually generate list items. In addition to that, the List component has another prop called _removeName_. This removeName function is passed down to the ListItem component from App.tsx. The attached _onClick_ method on each list item removes the clicked name from the array and sets the new state. If there isn't any name left to be displayed, the ListError component gets activated and the user is notified with a basic error message.

Please notice that the `<ListError />` could have been rendered using inline if with logical && operator. Just like the `<PickRandomListItem />` in App.tsx. However, I wanted to handle it the other way around and prevent ListError component from rendering depending on the value of its prop. React docs has a very nice read about [conditional rendering](https://reactjs.org/docs/conditional-rendering.html).

Let's take a look at `<ListItem />` and `<ListError />` respectively:

```javascript
import React from 'react';

interface ListItemProps {
    name: Name;
    removeName: RemoveName;
}

export const ListItem: React.FC<ListItemProps> = ({ name, removeName }) => {

    const handleRemove = () => {
        removeName(name.id);
    }

    return (
        <li className="app_list_item">
            <span className="app_list_item--name">{name.text}</span>
            <span className="app_list_item--remove" onClick={handleRemove}>&times;</span>
        </li>
    )
}
```

```javascript
import React from 'react';

interface ListErrorProps {
    names: Array<Name>;
}

export const ListError: React.FC<ListErrorProps> = ({ names }) => {

    if (names.length !== 0) return null;

    return (
        <li className="text-danger mt-2">Your list is empty!</li>
    )
}
```

Before I move on to the AddListItem component, I also want to show how the _removeName_ function looks like:

```javascript
const removeName: RemoveName = id => {
    setNames(names.filter(name => name.id !== id));
}
```

> The filter() method creates a new array with all elements that pass the test implemented by the provided function. <cite><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">MDN</a></cite>


**AddListItem Component**

This component consists of a basic HTML form, so the user can add names to the list. Unlike other child components of App, AddListItem components hold an internal state for the user input. _addName_ function in the App component is passed down, and AddListItem component calls that function along with the new user input once the form is being submitted. Let's take a look at how this is all constructed:

```javascript
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AddListItemProps {
    addName: AddName;
}

export const AddListItem: React.FC<AddListItemProps> = ({ addName }) => {
    const [newName, setNewName] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        addName(newName);
        setNewName("");
    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <form className="app_list_form" onSubmit={handleSubmit}>
                    <input 
                        className="app_list_form--input" 
                        type="text" 
                        value={newName} 
                        onChange={handleChange} 
                        placeholder="Please type a name..." 
                        autoFocus />
                    <span className="app_list_form--span" onClick={handleSubmit} >
                        <FontAwesomeIcon icon={faLevelDownAlt} rotation={90} />
                    </span>
                </form>
            </div>
        </div>
    )
}
```

And _addName_ function from App.tsx:

```javascript
const addName: AddName = newName => {
    newName.trim() !== "" &&
      setNames([{ id: uuidv4(), text: newName }, ...names]);
    setPickedName("");
}
```

In general, the user input is bound to the input value by the `onChange` handler received from `e.target.value`. Upon submit, the default submit action is prevented on the `onClick` handler and the _addName_ function is called with the typed text. Lastly, the input field is cleared by setting the internal state to an empty string.

**PickRandomListItem Component**

This final component consists of a button and a paragraph tag to display the picked name. As we discussed earlier, if the names array is empty, this component is not being rendered at all. _pickName_ function from App.tsx is passed down to PickRandomListItem component as a prop along with the `pickedName` prop. This prop is the second state of our App.tsx, where its' value is being updated depending on the result of _pickName_ function. PickRandomListItem component passes down the `pickedName` prop even further to the PickedRandomListItem component to be displayed. Let's see the component:

```javascript
import React from 'react';
import { PickedRandomListItem } from './PickedRandomListItem';

interface PickRandomListItemProps {
    pickName: PickName;
    pickedName: PickedName;
}

export const PickRandomListItem: React.FC<PickRandomListItemProps> = ({ pickName, pickedName }) => {

    const handleRandomPick = () => {
        pickName();
    }

    return (
        <div className="row">
            <div className="col-sm-12 app_randomgroup">
                {pickedName !== "" &&
                    <PickedRandomListItem pickedName={pickedName} />
                }
                <input className="app_randomgroup--button" type="button" value="Pick a random name!" onClick={handleRandomPick} />
            </div>
        </div>
    )
}
```

Finally, let's talk about how I achieved "the same name should not be picked twice in a row" criteria. The below function (pickName prop of PickRandomListItem component that I mentioned earlier) has another recursive function inside. It always remembers the previously selected random name and compares it with the next selection. If both selections are the same, it filters out the last selection from the mutatedNames array and then calls itself again. This case-sensitive operation goes on until a unique name is selected. If it is unable to find the second unique name, it prompts an alert. Either case, the state of App.tsx is updated, hence the UI.

```javascript
const pickName: PickName = () => {
    let mutatedNames = names;

    const recursivePickName = () => {
      if (mutatedNames.length !== 0) {
        const randomName = mutatedNames[Math.floor(Math.random() * mutatedNames.length)];

        if (randomName.text.toUpperCase() === pickedName.toUpperCase()) {
          mutatedNames = mutatedNames.filter(name => name.text !== randomName.text);
          recursivePickName();
        } else {
          setPickedName(randomName.text);
        }
      } else {
        setPickedName("");
        alert("\"The same name should not be picked twice in a row\" criteria cannot be met.");
      }
    }

    recursivePickName();
}
```

If you have reached this far, I truly appreciate your patience and interest in this article! Please feel free to get in touch and share your thoughts and comments.

Here is the [demo](https://alitursucular.github.io/names-list-with-react-and-typescript-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/names-list-with-react-and-typescript-demo).

_See my other posts: [Spotify Playlists Quiz with React](https://alitursucular.github.io/spotify-playlists-quiz-with-react/)_ and _[Filter and sort a dynamically created table with Vanilla JavaScript](https://alitursucular.github.io/filter-and-sort-dynamically-created-table-with-vanilla-javascript/)_