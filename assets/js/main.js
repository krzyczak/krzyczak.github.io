$(document).ready(function() {
  var bgs, cbg, load_initial, show_slide;
  
  load_initial = function() {
    var slide, slide_name;
    slide_name = (window.location.pathname || "").replace('/', '');
    slide = $("[name='" + slide_name + "']");
    if (slide.length < 1) {
      slide = $("[name='about']");
      history.replaceState({
        page: "about"
      }, "about", "/about.html");
    }
    slide = $(slide.attr("id").replace("b", "#s"));
    $(".main article.active").hide();
    $(".main article.active").removeClass("active");
    slide.addClass('active');
    return slide.show();
  };
  
  show_slide = function(target) {
    var slide;
    slide = target.attr("id").replace("b", "#s");
    history.replaceState({
      page: target.attr('name')
    }, target.attr('name'), "/" + (target.attr('name')+".html"));
    $(".main article.active").fadeOut(function() {
      return $(slide).fadeIn();
    });
    $(".main article.active").removeClass("active");
    return $(slide).addClass("active");
  };
  
  load_initial();
  
  $(".menu ul li a").click(function(event) {
    var target;
    target = $(event.target);
    return show_slide(target);
  });
  
  cbg = 0;
  bgs = ["../../assets/img/file01.jpg", "../../assets/img/file02.jpg", "../../assets/img/file03.jpg", "../../assets/img/file04.jpg", "../../assets/img/file05.jpg", "../../assets/img/file06.jpg", "../../assets/img/file07.jpg", "../../assets/img/file08.jpg", "../../assets/img/file09.jpg", "../../assets/img/file10.jpg", "../../assets/img/file11.jpg", "../../assets/img/file12.jpg", "../../assets/img/file13.jpg", "../../assets/img/file14.jpg"];
  
  setInterval((function() {
    $("#bg0").fadeToggle(1000, "swing", function() {
      if ($(this).css("display") === "none") {
        return $("#bg0").css("background-image", "url(\"" + bgs[cbg] + "\")");
      } else {
        return $("#bg1").css("background-image", "url(\"" + bgs[cbg] + "\")");
      }
    });
    cbg += 1;
    if (cbg >= bgs.length) {
      return cbg = 0;
    }
  }), 5000);

});
