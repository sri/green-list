Template.tabheaders.events({
  'click .nav-tabs > li'(event) {
    let currentTab = $(event.target).attr('href').substring(1);
    localStorage["current-tab"] = currentTab;
  }
});

Template.tabheaders.helpers({
  currentStats() {
    let userId = Meteor.userId();
    if (!userId) {
      return "(0/0)";
    }

    let total = ShoppingList.find({userId}).count();
    let remaining = ShoppingList.find({userId, purchased: true}).count();

    return `(${remaining}/${total})`;
  },

  allStats() {
    let userId = Meteor.userId();
    if (!userId) {
      return "(0)";
    }

    let total = Items.find({userId}).count();
    return `(${total})`;
  }
});

Template.tabheaders.onRendered(() => {
  let userId = Meteor.userId();
  let tab = "all";

  if (userId) {
    tab =
      localStorage["current-tab"] ||
      (ShoppingList.find({userId}).count() === 0 ? "all" : "current");
  }

  if (this.$(".nav-tabs .active").length === 0) {
    this.$(`.nav-tabs a[href="#${tab}"]`).tab('show');
  }
});
