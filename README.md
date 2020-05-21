# To-do List App - With database
Create a to-do lists for any of your outstanding/forgettable tasks.

## Getting Started
- The App is currently hosted on Heroku. For a quick peek visit [To-do list](https://damp-basin-51422.herokuapp.com/).
- To build this project locally, follow steps given below.

### Prerequisites
- Node, npm
- MongoDB Atlas account(free account works)
  - Visit [Getting started guide](https://docs.atlas.mongodb.com/getting-started/) for steps of setting up your free cluster in the cloud.

### Installing
Clone this repository. 
```bash
$ git clone https://github.com/pratik-bongale/todo-list-with-db.git
```

Change directory
```bash
$ cd todo-list-with-db
```

Install all dependencies
```
$ npm install
```

Rename ".env_sample" to ".env"
```
$ mv .env_sample .env
```

Modify ".env", replace the MongoDB connection string with your own generated in your MongoDB Atlas account.
```
MONGODB_CONN=mongodb+srv://username:password@cluster0-in9xt.mongodb.net/todolistDB
```

Run app locally
```
$ node app.js
```

Visit localhost 
```
Go to https://localhost:3000/
```

To create new lists, repalce "list-name" with the name you want for your new list.
```
Go to https://localhost:3000/[list-name]
Example: https://localhost:3000/work
```

You can also delete items using the checkbox on the left of each item.

## Learnings
- This project demonstrates how to:
  - Connect to mongoDB database using mongoose.
  - Perform Create, Read, Delete operations on mongoDB collections
  - Export functions/variables from a module
  - Import functions/variables into a module
  - Use Embedded Javasciprt(EJS) to define views
  - Reuse EJS views(Header/Footer) across all views for consistency
  - Render EJS views using expresJS
  - Handle get and post requests from the backend nodeJs script

## Author
* **Pratik Bongale** - *Initial work* - [Todo list with db](https://github.com/pratik-bongale/todo-list-with-db)


## Acknowledgments
- [The App Brewary](https://www.appbrewery.co/p/web-development-course-resources/)
- [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/)
