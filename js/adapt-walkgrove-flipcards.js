define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var FlipcardsView = ComponentView.extend({

    events: {
      'click .js-flip-item': 'onFlip'
    },
    
    preRender: function() {
      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      this.setReadyStatus();
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    },

    onFlip: function(event) {
      event.preventDefault();

      if(this.$(event.currentTarget).hasClass('is-flipped') === true) {
        this.$(event.currentTarget).addClass('is-not-flipped');
        this.$(event.currentTarget).removeClass('is-flipped');
      }else {
        this.$(event.currentTarget).addClass('is-flipped');
        this.$(event.currentTarget).removeClass('is-not-flipped');
      }

      const cardIndex = $(event.currentTarget).parent().data('index');
      this.setItemVisited(cardIndex);
    },

    setItemVisited: function(index) {
      this.$('.flipcards__widget').eq(index).addClass('is-visited');
      this.checkAllItemsCompleted();
    },

    checkAllItemsCompleted: function() {
      var complete = false;
      if(this.$('.flipcards__widget').length === this.$('.is-visited').length){
        complete = true;
      }
      if(complete) {
        this.setCompletionStatus();
      }
    },

  },
  {
    template: 'flipcards'
  });

  return Adapt.register('flipcards', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: FlipcardsView
  });
});
