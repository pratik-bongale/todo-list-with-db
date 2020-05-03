//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const MongoClient = require('mongodb');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// --- DATABASE CONNECTION ---

// connecting to localhost
// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//   useNewUrlParser : true,
//   useUnifiedTopology: true
// });

// connecting to db Server
mongoose.connect("mongodb+srv://admin-pratik:Test123@cluster0-in9xt.mongodb.net/todolistDB", {
  useNewUrlParser : true,
  useUnifiedTopology: true
});


const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "get some sugar"
});

const item2 = new Item({
  name: "get some milk"
});

const item3 = new Item({
  name: "get some oil"
});

const defaultItems = [item1, item2, item3];

const listsSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listsSchema);

// ---- GET / POST operations
app.get("/", function(req, res) {

  Item.find({}, (err, listItems) => {
    if (listItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("Successfully inserted default items");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: listItems});
    }
  });
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listTitle = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  if (listTitle === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: listTitle}, function(err, foundList) {
      if( !err ) {
        foundList.items.push(newItem);
        foundList.save();
      }
    });
    res.redirect("/" + listTitle);
  }


});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.list;

  if (listName === "Today") {
    Item.deleteOne({ _id: checkedItemId }, function(err) {});
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items : {_id: checkedItemId} } },
      { useFindAndModify: false },
      function(err, results) {
        if ( !err ) {
          res.redirect("/" + listName);
        }
      }
    );
  }

})

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err, foundList){
    if(!err) {
      if(!foundList) {
        const newList = new List({
          name: customListName,
          items: defaultItems
        });

        newList.save();

        res.redirect("/" + customListName);
      } else {
        // console.log(foundList);
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items });
      }
    }
  });
})

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });
//
// app.get("/about", function(req, res){
//   res.render("about");
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
