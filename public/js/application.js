$(function(){
  $('.user-block a').click(function(){
    $('#signup').hide();
    $('#login').hide();
    $($(this).attr('href')).show();
  });
});
