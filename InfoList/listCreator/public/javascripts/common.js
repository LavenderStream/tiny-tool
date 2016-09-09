$(function() {
  var content = $("#list-container");
        // 增加一个容器
         $("#list-add-button").click(function(){
        //    var index =   $("#list-container").children().length;
        //    var node = "<a id=\"list-item\" class=\"btn btn-raised btn-success\">" + index + "</a>";
        //    $(node).appendTo("#list-container");
    $.ajax({
      type:"GET",
      url:'http://localhost:8080/json',
      success:function(data){
      }
    });
         });

        // 删掉一个容器
         $("#list-delete-button").click(function(){
            $("#list-container a:last-child").remove();
         });

         // 删掉一个容器
          $("#list-item").click(function(){

          });
});
