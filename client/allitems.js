Template.allitems.helpers({
  items() {
    let userId = Meteor.userId();
    if (!userId) {
      return null;
    }
    return Items.find({userId}, {sort: {name: 1}});
  },

  lastPurchased(purchasedOn) {
    if (!purchasedOn) {
      return "";
    }
    // From http://momentjs.com/docs/#/displaying/difference/
    let measurements = [
      "years", "months", "weeks", "days", "hours"
    ];
    for (let m of measurements) {
      let diff = moment().diff(purchasedOn, m);
      if (diff > 0) {
        m = m.replace(/s$/, "");
        return `${diff} ${m} ago`;
      }
    }
    return "";
  }
});

Template.allitems.events({
  'click .remove'(event) {
    let userId = Meteor.userId();
    if (!userId) {
      return false;
    }

    let t = $(event.target).parents(".item");
    let name = t.data("name");
    let id = t.data("id");

    if (confirm(`Remove "${name}"?`)) {
      Items.remove(id);
    }

    return false;
  },

  'click .add-item'(event) {
    let userId = Meteor.userId();
    if (!userId) {
      return false;
    }

    let names = $("#search").val().split(/,/);

    for (let name of names) {
      name = capitalize($.trim(name));
      if (name === "" || Items.findOne({userId, name})) {
        continue;
      }
      Items.insert({userId, name});
      ShoppingList.insert({userId, name});
    }

    $("#search").val("");
  },

  'click .clear-search'(event) {
    $(".clear-search").addClass("hidden");
    $("#allitems li").show();
    $("#search").val("").focus();
  },

  'keyup #search'(event) {
    if (event.keyCode === 13) {
      $(".add-item").click();
      return;
    }

    let search = $.trim($(event.target).val());
    let clearSearch = $(".clear-search")

    if (search.length === 0) {
      $("#allitems li").show();
      clearSearch.addClass("hidden");
      return;
    }

    clearSearch.removeClass("hidden");

    let re = new RegExp(search, 'i');
    $("#allitems li").each(function(idx, li) {

      li = $(li);
      if (!li.data('name').match(re)) {
        li.hide();
      } else {
        li.show();
      }
    });
  },

  'click .item'(event) {
    let userId = Meteor.userId();
    if (!userId) {
      return;
    }

    let item = $(event.target);
    let name = item.data("name");
    let alreadyAdded = item.hasClass("list-group-item-success");

    item.toggleClass("list-group-item-success");

    let existing = ShoppingList.findOne({userId, name});

    if (alreadyAdded) {
      if (existing) {
        ShoppingList.remove(existing._id);
      }
    } else if (existing) {
      ShoppingList.update(existing._id, {$set: {purchased: false, purchasedOn: null}});
    } else {
      ShoppingList.insert({userId, name});
    }
  }
});
