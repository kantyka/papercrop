(function ($) {
  window.jcrop_api = null;

  window.init_papercrop = function() {
    $("div[id$=_cropbox]").each(function() {

      var attachment = $(this).attr("id").replace("_cropbox", "");
      var preview    = !!$("#" + attachment + "_crop_preview").length;
      var aspect     = $("input#" + attachment + "_aspect").val();
      var width      = $(this).width();
      var initial_preview_height = $("#" + attachment + "_crop_preview_wrapper").height();

      if (aspect === 'false') {
        aspect = false
      }

      update_crop = function(coords) {
        var preview_width, preview_height, rx, ry, cur_aspect;

        if (preview) {
          preview_height = initial_preview_height;
 
          cur_aspect = coords.w / coords.h;
          preview_width = Math.round(preview_height * cur_aspect);
 
          if (preview_width > initial_preview_height) {
            preview_width = initial_preview_height;
            preview_height = Math.round(preview_width / cur_aspect);
          }

          rx = preview_width / coords.w;
          ry = preview_width / coords.h;

          $("#" + attachment + "_crop_preview_wrapper").css({
            width : preview_width + "px",
            height : preview_height + "px",
          });

          $("img#" + attachment + "_crop_preview").css({
            width      : Math.round(rx * $("input[id$='_" + attachment + "_original_w']").val()) + "px",
            height     : Math.round((ry * $("input[id$='_" + attachment + "_original_h']").val()) / cur_aspect) + "px",
            marginLeft : "-" + Math.round(rx * coords.x) + "px",
            marginTop  : "-" + Math.round((ry * coords.y) / cur_aspect) + "px"
          });
        }

        $("#" + attachment + "_crop_x").val(Math.round(coords.x));
        $("#" + attachment + "_crop_y").val(Math.round(coords.y));
        $("#" + attachment + "_crop_w").val(Math.round(coords.w));
        $("#" + attachment + "_crop_h").val(Math.round(coords.h));
      };

      $(this).find("img").Jcrop({
        onChange    : update_crop,
        onSelect    : update_crop,
        setSelect   : [0, 0, 250, 250],
        aspectRatio : aspect === false ? undefined : aspect,
        boxWidth    : $("input[id$='_" + attachment + "_box_w']").val()
      }, function() {
        jcrop_api = this;
      });
    });
  };

  $(document).ready(function() {
    init_papercrop();
  });

}(jQuery));
