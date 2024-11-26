/**--------------------- READ THIS BEFORE RUN ----------------**/
/**
 *  Timeout:
 *      this timeout is in seconds, if you set this to 5,
 *      every 5 second, this script will run 
 * 
 *  NOTE:
 *      increase timeout if any suspend or rate limit happens
 */
var timeout = 5;

/**--------------------- DON'T Change This SECTION - START ----------------**/

// START - app variables
//   NOTE:
//      Don't change this
var unfollowedUsers = 0;
timeout = timeout * 1000;

/**--------------------- DON'T Change This SECTION - END ----------------**/

var unfollowUsers = function () {
    // Select all users in the current view
    document.querySelectorAll('[data-testid="UserCell"]').forEach(function (userCell) {
        let followsYou = false;

        // Check if the user follows you back
        userCell.querySelectorAll('[data-testid="userFollowIndicator"]').forEach(function () {
            followsYou = true;
        });

        // If the user doesn't follow you, unfollow them
        if (!followsYou) {
            userCell.querySelectorAll('div[data-testid$="-unfollow"]').forEach(function (unfollowButton) {
                try {
                    unfollowButton.click(); // Click on the unfollow button
                } catch (error) {
                    console.error(error);
                }
            });

            // Confirm the unfollow action in the confirmation dialog
            document.querySelectorAll('div[data-testid="confirmationSheetConfirm"]').forEach(function (confirmButton) {
                confirmButton.click();
                unfollowedUsers++;
            });

            console.log(unfollowedUsers + ' users unfollowed');
        }
    });

    // Scroll down to load more users
    window.scrollBy(0, 100);
};

// Run the script at intervals
setInterval(unfollowUsers, timeout); // Run the script multiple times
unfollowUsers(); // Run for the first time
