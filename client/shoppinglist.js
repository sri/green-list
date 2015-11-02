Template.shoppinglist.helpers({
  items() {
    let userId = Meteor.userId();
    if (!userId) {
      return false;
    }

    return ShoppingList.find({userId}, {sort: {name: 1}});
  }
});

Template.shoppinglist.events({
  'click .archive-purchased'(event) {
    let userId = Meteor.userId();
    if (!userId) {
      return;
    }

    ShoppingList.find({userId, purchased: true}).forEach((sl) => {
      let item = Items.findOne({name: sl.name});
      if (item) {
        Items.update(item._id, {$set: {purchasedOn: sl.purchasedOn}});
      }
      ShoppingList.remove(sl._id);
    });
  },

  'click .remove'(event) {
    let userId = Meteor.userId();
    if (!userId) {
      return false;
    }

    let t = $(event.target).parents(".shopping-item");
    let name = t.data("name");
    let id = t.data("id");

    if (confirm(`Remove "${name}"?`)) {
      ShoppingList.remove(id);
    }

    return false;
  },

  'click .shopping-item'(event) {
    let userId = Meteor.userId();
    if (!userId) {
      return;
    }

    let item = $(event.target);
    let id = item.data("id");
    let wasPurchased = item.hasClass("purchased");
    let purchasedOn = null;

    if (!wasPurchased) {
      purchasedOn = new Date().getTime();
    }

    item.toggleClass("purchased");
    ShoppingList.update(id, {$set: {purchased: !wasPurchased,
                                    purchasedOn: purchasedOn}});
  }
});
