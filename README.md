Alright, let’s try to keep this to the point; without too much excess jargon. I will try to include a `tl;dr` sentence at the top of each section for those who aren’t interested in the details.

Note: For this blog post I will be using a react-redux front-end
with a rails API backend.


Why do we need JWT?

tl;dr: We need a way to pass and receive encrypted information from our front-end application to our back-end application.

To get information from or send information to our back-end API we will need to make an HTTP GET or POST request from our front-end app. Any HTTP request traveling over the web has the potential to be intercepted by pesky h4ck3rz ( though not common it’s always best to prepare for the worst ). A more common issue comes into play with the ease of access users have to data stored in their browsers’ `localStorage` or `sessionStorage` cookies. Go to chrome ( it should work in most other browsers, but I’m honestly too lazy to check ) navigate to a site that you’re logged in to ( amazon, facepage, tweeter, instanag, etc. ), open up your `console` ( Mac users: `cmd + opt + j` ), and type in `sessionStorage`. Your console should output the value of that variable as a JavaScript object with a few key-value pairs inside. You can go ahead and look through the object, but more often than not all of the values will be encrypted. This is exactly what we will be doing when we set up our authentication with JWT.


Why do we need to use our browsers’ `sessionStorage`?

tl;dr: To persist a users’ session for our application and to easily keep track of our current user.

We need a place to store who our current user is on the front-end so that when we make additional HTTP requests to our back-end our back-end will know which users’ data to fetch or update. The reason we store a reference to our current user in the browser's `sessionStorage` and not react-redux’s `state` object ( an object that holds all local data specific for our front-end application ) is because our application’s `state` object is destructive ( a new object is returned anytime `state` needs to be updated ). If we wanted to store our user reference in the `state` object then we would have to pass that reference through every single event and action our user takes… and that would be exhausting to debug if you forgot.

Note: We use `sessionStorage` and not `localStorage` because the `sessionStorage` object is reset when our user closes our application; `localStorage` has no expiration.


I can haz use of JWT?

Haz you can! Let’s walk through the steps to setup JWT for a user that signs up with our application the first time.

Note: I will try to color code so that it’s obvious what lines go in our front-end application and what lines go in our back-end application.

1. RAILS Bring in the JWT library into your back-end. Use https://jwt.io/ to determine what the best version to use for your back-end.
    1. I am using the `jwt` gem for rails
    2. Inside my Gemfile:
        1. `gem ‘jwt’`
    3. Also uncomment the `bcrypt` gem - we’ll need this later
2. REACT-REDUX create a route ( using react-router ) to your user signup component.
    1. I put mine as the first nested child route inside my root Route. It’s using my `UserSignUp` component ( which we haven’t created yet ) and directing to that component when the url matches “/signup” ( the initial “/“ comes from our App Route so we won’t actually have to include that in our signup path - it should just be `path=“signup”` )
        1. PICTURE
        2. Don’t forget to import the to-be created `UserSignUp` component
3. REACT-REDUX create the `UserSignUp` component with a form and an action / event to trigger on form submit
    1. Let’s make it a JavaScript class component because we will need an action to dispatch our user information
    2. import React, connect, and bindActionCreators
    3. create your class component and extend `React.Component` or just `Component` if you’re fancy with your imports ( I named mine `UserSignUp`, but obviously you don’t have to )
        1. create your `render( )` function that returns jsx with a wrapping `div` around a `form` tag
        2. make sure every input you use inside your form has it’s own unique `ref` field ( ex. `<input ref=“password” type=“password” />` ) we will need these to grab our users’ input values after they submit the form
        3. also, make sure to include a `submit` button at the bottom of the form
        4. last for our form, add an `onSubmit` event field to your `form` tag. This event will trigger a custom function that we haven’t written yet to handle gathering our user’s information on form submit. ( make sure you prepend your `this` context to the callback function - remember we’re using a JavaScript class so we have to be explicit in referencing a function within the same class )
            1. PICTURE
        5. create a `constructor( )` method to handle the binding of your context to the function handling our users’ form submit event
            1. PICTURE
        6. create your custom function to handle the form submit event
            1. this function should take in one argument, which will be our event object passed in by the onSubmit event ( we need it to prevent our page from refreshing - `event.preventDefault( )` )
            2. inside the function create a variable that will reference an object of key-values pertaining to the information gathered from the submitted form
                1. to grab specific inputs with the `ref` field we can just pull that specific `ref` with `this.refs.nameOfRef.value` ( `this.refs.password.value` would get the input value for our password input )
                2. Try to set up the key’s in your object to match the attributes in your back-end `user` model ( i.e. how you would want to do your `User.create(first_name: value, email: value, password: value…)` in rails )
            3. With our object setup to handle our user’s inputs we’ll need to send this object into an action that will POST the object to our back-end API. Let’s reference a to-be setup action that will be passed to our class’ props through `mapDispatchToProps`. This action will take one argument that is our object created in step 2 above - I referenced my action as: `this.props.createUser(user)`
        7. Create the `mapDispatchToProps` function outside of your class to take in `dispatch` as the one argument
            1. Our `mapDispatchToProps` function will execute the imported `bindActionCreators` function with the first argument as an object with the key-value pair of `{createUser: createUser}` ( the `createUser` value will be the action handling our back-end post request ). Because we’re using ES6 any object with the same key-value pair name can be referenced as just the name ( `{createUser: createUser}` is the same as `{createUser}` ). The second argument will be the dispatch function passed in from `mapDispatchToProps`.
            2. Last, we’ll return our executed `bindActionCreators` function.
        8. At the bottom of our file let’s `export default` our `connect` function
            1. `connect`’s first argument will be `null` ( usually where `mapStateToProps` is passed in ) and the second argument will be our `mapDispatchToProps` declared above and passed in as a callback to `connect`
            2. Now for the weirdest part of `connect`. After we pass in `null` and `mapDispatchToProps` our `connect` function will execute and return another function. This returned function expects an argument that will be our whole component class. It should look like: `export default connect(null, mapDispatchToProps)(UserSignUp)`.
        9. Finally, we’ll need to import our to-be created action: `import { createUser } from ‘../actions/index’`.
    4. REACT-REDUX create a `createUser` function in `actions/index.js` that takes in one argument - the user object we passed in from our `UserSignUp` component. Make sure to `export` this function.
        1. Our function will handle the posting of our user object to our back-end application.
            1. I used `axios` to handle my HTTP request and responses. The `axios.post` will get set to a variable called `response` and take in two arguments. The first argument will be a string of the URL endpoint we want to post to. The second argument will be the user object we passed into our function. The POST should look like: `let response = axios.post('http://localhost:3000/api/v1/signup', userObject)`.
        2. We will need to do more in this function to handle the response after we POST the data to our back-end.
    5. RAILS User’s table, route and model.
        1. Table - string attribute for `password_digest`
        2. Model - `has_secure_password` macro
        3. Route - `post '/signup', to: 'users#create’`
    6. RAILS User’s controller create action
        1. If you’re using a `password_confirmation` field check if the `password_confirmation` and `password` values are the same; if not render a json object with a key of `errors` pointing to an array of objects. After the object render a key of `status` with the value of `404`.
        2. Initialize your user object with the params passed in from your front-end application and set it equal to a variable.
        3. Verify that your user can be saved
            1. If the user can be saved we’ll need to turn our user’s id into an encrypted jwt token before passing it back to our front-end application. We’re going to set this up in the next section. First, we’re going to write out the code that we would ideally like to work: `jwt = Auth.issue({user: user.id})` . We’ll have to make an `Auth` class with an `issue` class method.
    7. RAILS Auth class and issue class method
        1. In our `lib` folder we’ll create a file called `auth.rb` in which we’ll create our `Auth` class. Make sure we join the `lib` folder into our Rails application to use the `Auth` app. In `config/application.rb` add `config.autoload_paths << Rails.root.join('lib')`.
        2. Our class will have 3 class methods - `issue`, `decode`, and `secret_key` - and one constant variable - `ALGORITHM`
            1. `issue` will be responsible for encoding our users’ id into an encrypted hash to be stored in our `sessionStorage` object from the front-end. This method will take in one argument, which is the hash passed in from our user’s controller.
                1. We will need to use the `jwt` gem to encrypt our user data. The `jwt` gem provides us with access to a `JWT` class that has an `encode` and `decode` class method. We’ll use the `JWT.encode` method to encrypt the data. This method takes in the user’s data hash as the first argument, a secret key ( we’ll talk about what this is in a sec ) and an algorithm key ( this will be our constant - also talked about later ). `JWT.encode(data, secret_key, ALGORITHM)`
                2. The `JWT.encode` method will return our user’s hash encrypted by the secret key ( encryption salt ) and the algorithm, which is the type of encryption algorithm to use.
            2. `ALGORITHM` will be the type of encryption algorithm used to hash our data
                1. This will be a constant referencing a string of: HS256, HS384 or HS512 ( each a different SHA hashing algorithm )
                2. I used SHA-256 for this application: `ALGORITHM = ‘HS256’`
            3. `secret_key` class method
                1. This will be our salt for the encryption. The `secret_key` method will only have one string of random characters in it. Use `rake secret` in your terminal to get a good secret key.
            4. `decode` class method
                1. This will be used to decrypt our user data when it comes back from the front-end whenever we want to update data for our user.
                2. It will take in one argument and execute the `JWT.decode` method. The `JWT.decode` method takes in our encrypted data as the first argument, our `secret_key` as the second, the third argument is a boolean to let our method know if we used an algorithm to encrypt the data, the fourth argument is a hash with the key of `algorithm` and value of the algorithm string we used for the encryption. `JWT.decode(data, secret_key, true, {algorithm: ALGORITHM})` .
    8. REACT back in our `createUser` action we'll need to handle putting our `jtw` data into the `sessionStorage` object and redirecting our user. These two actions should be handled in the resolution of our `axios.post` promise.
        1. append a `.then` to our `axios.post`. The `then` function will take an argument of a function that we'll define. This function should take an argument of the data returned by our promise. Inside the function we'll set our `jwt` key to our `sessionStorage` with `sessionStorage.setItem('jwt', data.jwt)` ( our data object will be the returned data from the back-end on which we set the jwt key-value ). We'll also want to redirect our user using `browserHistory.push` ( make sure to import `browserHistory` ). Return the data object at the end of our function so that the variable set to handle our `axios.post` response will be a promise object and not undefined.
        2. Last in our `createUser` function we'll return an object with the keys of `type` and `payload` ( this will be returned outside of our `.then` method ). The `type` value should be a string for the corresponding reducer case and the `payload` value should be our entire promise object. Note: The `payload` value has to be a promise object for `reduxPromise` to handle the resolution of our promise.
            1. ```ruby
              export const createUser = (user) => {
                let response = axios.post(URL + 'signup', user).then((innerResponse) => {
                  sessionStorage.setItem('jwt', innerResponse.data.jwt)
                  browserHistory.push(`/drinks`)
                  return innerResponse
                })

                return {
                  type: "SIGN_UP",
                  payload: response
                }
              }
              ```
    9. REACT create a `users-reducer` file to handle returning any other data we might want to state
    10. REACT make sure to add the users reducer to our `root-reducer` as a key-value pair.
