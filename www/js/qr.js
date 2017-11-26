function htmlEncode (value) {
  return $('<div/>').text(value).html();
}

function generateQR () {
  console.log("here");
  console.log("https://chart.googleapis.com/chart?cht=qr&chl=" + htmlEncode($("#link").val()) + "&chs=160");
    $(".qr").attr(
      "src",
      "https://chart.googleapis.com/chart?cht=qr&chl=" + htmlEncode($("#link").val()) + "&chs=160"
    );
    console.log("past");
}