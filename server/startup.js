Meteor.startup(() => {

  Meteor.publish("items", (userId) => {
    check(userId, String);
    return Items.find({userId});
  });

  Meteor.publish("shoppinglist", (userId) => {
    check(userId, String);
    return ShoppingList.find({userId});
  });

  ///////////////////////////////////////////////////////////////////
  // DB Access Restrictions:
  //

  Items.allow({
    insert() {
      return Meteor.userId() !== null;
    },
    remove(userId, item) {
      return userId === item.userId;
    }
  });

  ShoppingList.allow({
    insert() {
      return Meteor.userId() !== null;
    },
    update(userId, shoppingListItem) {
      return userId === shoppingListItem.userId;
    },
    remove(userId, shoppingListItem) {
      return userId === shoppingListItem.userId;
    }
  });

  ShoppingHistory.allow({
    insert() {
      return Meteor.userId() !== null;
    }
  });
});
