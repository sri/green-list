Meteor.startup(() => {

  Tracker.autorun(() => {
    let userId = Meteor.userId();

    Meteor.subscribe("items", userId);
    Meteor.subscribe("shoppinglist", userId);
  });

});
