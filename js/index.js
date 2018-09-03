$(function () {
  $(".mask .ewm .close").on("click", function () {
    $(".mask").css({display: 'none'});
    $("body").css({overflow: "auto"})
  })
  myAjax(141, 30, '.list.list1', 'block')
  myAjax(154, 70, '.list.list2', 'none')
})

function myAjax(id, page_size, dom, display) {
  $.ajax({
    type: "get",
    url: "http://www.86sb.com/adv/sbadvad",
    dataType: 'jsonp',
    jsonp: 'callback',
    data: {
      id: id,
      page_size: page_size,
      noflag: 1
    },
    success: function (data) {
      console.log(data.result.data);
      var strs = '';
      
      $.each(data.result.data, function (idx, val) {
        if (val.sbdetail == null || val.sbdetail == undefined || val.sbdetail == 0||val.sbdetail == "") {
          val.sbdetail = '优质商标，匠心品质。匠心精神打造精致产品，每一款产品凝聚匠人智慧，每一处细节倾注匠心工艺，小商标成就大事业';
        } else {
          val.sbdetail = val.sbdetail.slice(0, 36) + '...'
        }
        
        if (val.sbshow.indexOf("4") == -1) {
          val.sbspecialsprice = 799
        }
        strs += "<li>" +
          "<a target='_blank' href=" + "http://www.86sb.com/info-" + val.id + ".html class=" + val.sbflag + ">" +
          "<img src=" + val.sbpic + ">" +
          "<span class='name'>" + val.sbname + "</span>" +
          "<span class='lei'>" + val.sbbigclassid + "类</span>" +
          "<p class='bottomdes'>" + val.sbdetail + "</p>" +
          "<div class='bott' style=display:" + display + ">" +
          "<span>￥" + val.sbspecialsprice + "元</span>" +
          "<span>立即购买></span>" +
          "</div></a></li>"
      });
      $(dom).html(strs);
      
      $.each($('.list li a'), function (idx, val) {
        if (val.classList.contains(2)) {
          $(this).addClass('disabled')
          $(this).attr('href', 'http://www.86sb.com')
        }
      })
      
      if (data.result.data.length <= 15) {
        $("body").css({overflow: "hidden"})
        $(".mask").css({display: "block"});
      }
    }
  })
}





