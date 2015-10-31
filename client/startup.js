Meteor.startup(() => {

  Tracker.autorun(() => {
    let userId = Meteor.userId();

    let itemsHandle = Meteor.subscribe("items", userId);
    let shoppingListHandle = Meteor.subscribe("shoppinglist", userId);

    if (Meteor.userId() &&
        itemsHandle.ready() &&
        shoppingListHandle.ready()) {

      ShoppingList.find({userId}).forEach((sl) => {
        $(`#allitems li[data-name="${sl.name}"]`).addClass("list-group-item-success");
      });
    }
  });

});
