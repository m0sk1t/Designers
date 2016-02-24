(function() {
  var currentSection = 0;
  $('#right').on('click', function() {
    turnSection(1);
  });
  $('#left').on('click', function() {
    turnSection(-1);
  });

  function turnSection(dir) {
    if (dir === -1) {
      if (currentSection === 0) {
        currentSection = $('section').length - 1;
      } else {
        currentSection += dir;
      }
    } else {
      if (currentSection === $('section').length - 1) {
        currentSection = 0;
      } else {
        currentSection++;
      }
    }
    $('#sec0').css('margin-left', '-' + currentSection + '00%');
    $('article').css('background-position', (100 / $('section').length) * currentSection + '% 0');
  }
})();