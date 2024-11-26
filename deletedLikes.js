/**--------------------- READ THIS BEFORE RUN ----------------**/
/**
 *  Timeout:
 *      This timeout is in seconds, if you set this to 5,
 *      every 5 seconds, this script will run 
 * 
 *  NOTE:
 *      Increase timeout if you face rate-limiting or suspension
 */
var timeout = 5; // Set interval time in seconds

/**--------------------- DON'T Change This SECTION - START ----------------**/
// START - app variables
// Don't change this part
var deletedLikes = 0;
timeout = timeout * 1000; // Convert timeout to milliseconds

/**--------------------- DON'T Change This SECTION - END ----------------**/

var removeLikes = function () {
    // Get the number of tweets remaining
    var tweetsRemaining = document.querySelectorAll('[role="heading"]+div')[1]?.textContent;
    console.log('Remaining: ', tweetsRemaining, ', Deleted Likes:', deletedLikes);

    // Un-like tweets (Remove Likes)
    document.querySelectorAll('[data-testid="unlike"]').forEach(function (likeButton) {
        try {
            likeButton.click(); // Click on the 'unlike' button
            deletedLikes++;
            console.log('Like removed. Total removed:', deletedLikes);
        } catch (error) {
            console.error('Error occurred while removing like:', error);
        }
    });

    // Scroll down to load more tweets if necessary
    window.scrollBy(0, 2000); // Increase scroll amount to load more tweets
};

// Run the script at the defined interval
setInterval(removeLikes, timeout); // Run the script multiple times with the given interval
removeLikes(); // Run for the first time
