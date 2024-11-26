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
var deletedTweets = 0;
timeout = timeout * 1000;

/**--------------------- DON'T Change This SECTION - END ----------------**/

var deleteTweets = function () {
    // Display the number of remaining tweets and deleted tweets
    var tweetsRemaining = document.querySelectorAll('[role="heading"]+div')[1]?.textContent || "Unknown";
    console.log('Remaining tweets: ', tweetsRemaining, ', Deleted:', deletedTweets);

    // Find all tweets in the current view
    document.querySelectorAll('article[data-testid="tweet"]').forEach(function (tweetArticle) {
        // Open the "More" menu for each tweet
        tweetArticle.querySelectorAll('[aria-label="More"]').forEach(async function (menuButton) {
            menuButton.click();

            // Wait for the menu to appear
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Look for the "Delete" option and click it
            document.querySelectorAll('[role="menuitem"]').forEach(async function (menuItem) {
                if (menuItem.textContent === 'Delete') {
                    menuItem.click();

                    // Wait for the confirmation dialog and click the confirm button
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    document.querySelectorAll('[data-testid="confirmationSheetConfirm"]').forEach(function (confirmButton) {
                        confirmButton.click();
                        deletedTweets++;
                    });
                }
            });
        });
    });

    // Un-retweet tweets (if any retweets are found)
    document.querySelectorAll('[data-testid="unretweet"]').forEach(function (unretweetButton) {
        unretweetButton.click();
        document.querySelectorAll('[data-testid="unretweetConfirm"]').forEach(function (confirmButton) {
            deletedTweets++;
            confirmButton.click();
        });
    });

    // Scroll down to load more tweets
    window.scrollBy(0, 30);
};

// Run the script at intervals
setInterval(deleteTweets, timeout); // Run the script multiple times
deleteTweets(); // Run for the first time
