// DOM Ready =============================================================
$(document).ready(function() {

    $('#btnAddGoal').on('click', addGoal);
    $('#btnAddStep').on('click', addStep);

});

function getCook(cookiename)
  {
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

// Populate Goals
function populateGoals() {

    //Use AJAX to retrieve goals
    $.ajax({
        type: 'GET',
        url: '/goals/findemailgoals/' + getCook('email'),
        dataType: 'JSON'
    }).done(function( response ) {
        console.log(response);
    });
}

// Add Goal
function addGoal(event) {

    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addGoal input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        var newStep = {
            'goal': $('#inputGoal').val(),
            'step': '#primary',
            'description': '#primary',
            'date': '#primary'
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newStep,
            url: '/goals/addgoal',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addStep fieldset input').val('');

                // Update page
                location.reload();

            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Add Goal
function addStep(event) {

    $div = $(event.target).parent().parent("div");
    id = $div.attr("id");
    goal = $div.find("a").text();

    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    // $('#addGoal input').each(function(index, val) {
    //     if($(this).val() === '') { errorCount++; }
    // });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        var newStep = {
            'goal': goal,
            'step': $('#inputStepName').val(),
            'description': $('#inputStepDesc').val(),
            'date': $('#inputStepDate').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newStep,
            url: '/goals/addstepb',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Update page
                location.reload();

            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
