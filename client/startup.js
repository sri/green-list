Meteor.startup(() => {

  Tracker.autorun(() => {
    let userId = Meteor.userId();

    let itemsHandle = Meteor.subscribe("items", userId);
    let shoppingListHandle = Meteor.subscribe("shoppinglist", userId);

    if (Meteor.userId() &&
        itemsHandle.ready() &&
        shoppingListHandle.ready()) {

      // We want to highlight items in All Items
      // that are in the shopping list. It needs
      // to be reactive -- items can get added
      // or removed from the shopping list anytime.
      $("#allitems li.list-group-item-success").removeClass("list-group-item-success");

      ShoppingList.find({userId}).forEach((sl) => {
        $(`#allitems li[data-name="${sl.name}"]`).addClass("list-group-item-success");
      });
    }
  });

});
