var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'users': 'users',
        'images': 'images',
        'upload_image_set' : 'upload_image_set',
        'comments': 'comments',
        'likes': 'likes',
        'postImages': 'postImages',
        'image_sets/:id' : 'image_sets'
    },

    home: function() {

      $('.recent_imageset').empty();
      $('#content').empty();
      $('#myCarousel').show();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#homePicSetsTemplate').html());
              $('.recent_imageset').html(template({
                picSet: response
            }));
        });
    },

    upload_image_set: function() {
      $('#myCarousel').hide();
      $('#content').empty()
      var template = Handlebars.compile($('#uploadTemplate').html());
          $('#content').html(template({
                // picSet: response
            }));


      // $.ajax({
      //   url: 'https://pixelect-rails-api.herokuapp.com/image_sets',
      //   type: 'POST',
      //   data: {image_set: {
      //           votingCriteria: $('#content').find('input[name="voting-criteria"]').val(),
      //           user_id: 1,
      //           total_likes: 0
      //       }
      //   })
      // }).done(function(response){
      //   console.log(response);
      // });
    },

//im not sure if we will ever need all the users, just one I think.
    users: function() {
      $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/users',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#usersTemplate').html());
              $('#content').html(template({
                user: response
            }));
        });
    },

    image_sets: function(id) {
        $('#content').empty();
        $('#myCarousel').hide();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/image_sets/' + id,
            type: 'GET'
        }).done(function(response) {
          console.table(response);
            var template = Handlebars.compile($('#imageSetTemplate').html());
              $('#content').html(template({
                image_set: response
            }));
        });
    },

    images: function() {

      $('#content').empty();
      $('#myCarousel').hide();


        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/images',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#imagesTemplate').html());
              $('#content').html(template({
                image: response
            }));
        });
    },


    comments: function() {
        $('#myCarousel').hide();
        $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/comments',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#commentsTemplate').html());
              $('#content').html(template({
                comment: response
            }));
        });
    },

    likes: function() {
        $('#myCarousel').hide();
        $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/likes',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#likesTemplate').html());
              $('#content').html(template({
                like: response
            }));
        });
    }





});
// var events = function() {
//     $('.see-image-set').on('click', image_sets);
// };

// $(function() {
//     events;
// })

  // $('#content').on('click', '#submitComment', function() {
        // e.preventDefault();

    var comment_post = function() {

        // console.log($(this).attr("data-id"))
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/comments',
            type: 'POST',
            data: {comment: {
                body: $('#content').find('input[name="createComment"]').val(),
                user_id: 1,
                image_set_id: $(this).attr("data-id")}
            }
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#imageSetTemplate').html());
              $('<li>').append(template({
                comment: response
            }));

        });
    };


$(document).ready(function () {
  $('#content').on('click', '#submitComment', comment_post)
  // $('#content').on('click', '#submit-picture-set', upload_image_set)
});

var router = new Router();


Backbone.history.start();