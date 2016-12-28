// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    $('#btnAddStep').on('click', addStep);


});

// Functions =============================================================


// Add Step
function addStep(event) {

    console.log("clicked add!");

    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addStep input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        var newStep = {
            'user': $('#inputUser').val(),
            'goal': $('#inputGoal').val(),
            'step': $('#inputStep').val(),
            'description': $('#inputDescription').val(),
            'date': $('#inputDate').val()
        }

        console.log(newStep);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newStep,
            url: '/goals/addstep',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addStep fieldset input').val('');

                // Update page
                alert("goal created");
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

// // Delete User
// function deleteUser(event) {
//
//     event.preventDefault();
//
//     // Pop up a confirmation dialog
//     var confirmation = confirm('Are you sure you want to delete this user?');
//
//     // Check and make sure the user confirmed
//     if (confirmation === true) {
//
//         // If they did, do our delete
//         $.ajax({
//             type: 'DELETE',
//             url: '/users/deleteuser/' + $(this).attr('rel')
//         }).done(function( response ) {
//
//             // Check for a successful (blank) response
//             if (response.msg === '') {
//             }
//             else {
//                 alert('Error: ' + response.msg);
//             }
//
//             // Update the table
//             populateTable();
//
//         });
//
//     }
//     else {
//
//         // If they said no to the confirm, do nothing
//         return false;
//
//     }
//
// };
