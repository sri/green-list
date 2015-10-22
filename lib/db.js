// Items
//   - name: String
Items = new Mongo.Collection("items");

// ShoppingList
//   - name: String
//   - purchased: True|False (optional)
//   - purchasedOn: DateTime (optional)
ShoppingList = new Mongo.Collection("shoppinglist");

// ShoppingHistory
//   - name: String
//   - purchasedOn: DateTime
ShoppingHistory = new Mongo.Collection("shoppinghistory");
