# Promises

Promises in JavaScript work quite similar to promises in real world. So first let us look at promises in real life. The definition of a promise from the dictionary is as follows

**noun**: a declaration or assurance that one will do something or that a particular thing will happen.

So what happens next whem somebody makes a promise to me?

1. It's not important for me to know if they are going to get the thing done themselves or through someone else. It is not important.

2. At the time of making a promise, all we have is only an assurance. We won't be able to act on it immediately. We can decide and formulate what needs to be done when the promise is kept(and hence we have expected outcome) or broken(we know the reason and hence we can plan a contingency).

3. The promise can be either kept or broken by them.

4. When a promise is kept you expect something out of that promise. You can make use of the output of a promise for your further actions or plans.

5. When the other person breaks the promise, we would like to know why they were not able to keep up their side of the bargain to decide our future course of action.

6. There is a minute chance that we may never hear back from the person at all. In such cases you would prefer to keep a time threshold and take some action afterwards.

## Promises in JavaScript

Promises in JavaScript work quite similar to promises in real world. JavaScript being single-threaded is capable to do only one thing at a time. Thus, several features exist in JavaScript world which allow us to perform multiple operations at the same time. We are all aware of _callbacks_ and have been using them since JavaScript2. _Promises_ are also one of the features which allow us to do multiple things at the same time.

Technically, a promise can be in any of the following states at a certain point of time:

- **pending** - Promise is still waiting to be either fulfilled or rejected
- **fulfilled** - Promise succeeded
- **rejected** - Promise failed

There are two parts to understand while dealing with promises i.e

1. Creating promises
2. Handling promises

### Creating promises

Promises in JavaScript are created using the `Promise` [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) function.

The constructor function accepts a function named as _executor_. This function accepts two parameters named _resolve_ and _reject_(they are functions themselves). It's the executor function's responsibility to initiate the asynchronous operation and once completed, invoke _resolve_ or _reject_ functions based on its result. The return value of the executor is ignored.

Example:

```javascript
/* It fulfills a promise if random number generated is greater than 5; otherwise rejects it */
const executor = (resolve, reject) => {
  setTimeout(() => {
    const random = Math.floor(Math.random() * 10);

    if (random > 5) {
      resolve(`Resolved with ${random}`);
    } else {
      reject(`Rejected with ${random}`);
    }
  }, 3 * 1000);
};

// Creating a promise
const promise = new Promise(executor);

console.log(promise); // what do you expect to be logged here?
```

Or

```javascript
/* Fetch me some data from a URI */
const executor = (resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://some.uri.com/api');
  xhr.onload = () => resolve(xhr.responseText);
  xhr.onerror = () => reject(xhr.statusText);
  xhr.send();
};

// Creating a promise
const promise = new Promise(executor);
```

### Handling promises

As we saw above, a pending promise can either be fulfilled or rejected. Thus, we ought to have some handlers which can be invoked when either of these options happen. The `Promise` object provides two methods as handlers i.e

- Promise.prototype.then()
- Promise.prototype.catch()

We use `then` to handle a fulfilled promise while using `catch` to handle a rejected promise.

Important point to remember is that a `then` handler is capable of handling both fulfilled and rejected promises. But it is a good practice to use `catch` for rejected scenarios for a clearer understanding.

Another important point to remember is that both `then` and `catch` handlers return a _promise_ themselves. If it is hard to understand, imagine that the `then` function has been written in such a way that it serves the purpose of both handling a promise first and then creating a new promise afterwards.

Example:

```javascript
promise
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
```

Or

```javascript
promise
  .then((data) => {
    console.log(data);
  }, (err) => {
    console.log(err);
  });
```

There is potentially another method coming in JavaScript promises named _finally_ which will act as a handler always executed regardless of whether the promise was resolved or rejected.

### Some extra methods

- Promise.all()
- Promise.race()

Thing to remember is that they both act as promise **handlers**. While `Promise.all` waits for all promises to be resolved, or for any to be rejected, `Promise.race` waits until any of the promises is resolved or rejected.

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise1');
  }, 100);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise2');
  }, 200);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise3');
  }, 300);
});

Promise.all([promise1, promise2, promise3])
  .then(data => {
    console.log(data);  // if resolved, data will be an array of resolved items
  })
  .catch(err => {
    console.log(`Rejected ${err}`); // this will NOT be an array
  });
```

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise1');
  }, 100);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise2');
  }, 200);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise3');
  }, 300);
});

Promise.race([promise1, promise2, promise3])
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(`Rejected ${err}`);
  });
```
