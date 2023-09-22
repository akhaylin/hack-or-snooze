"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Get's inputted data from the new story form and calls addStory and generateStoryMarkup to format data
 * then displays the new story on the top of the stories list
*/
//FIXME: better function name submitNewStory
async function putStoryOnPage(evt) {
  console.debug("putStoryOnPage", evt);
  evt.preventDefault();

  //get form data
  const title = $newStoryTitleInput.val();
  const author = $newStoryAuthorInput.val();
  const url = $newStoryUrlInput.val();

  //call addStory method to add our new story
  const newStory = await storyList.addStory(currentUser, { title, author, url });

  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);//show at top of page

  //TODO: check functionality of submit button
  $newStoryForm.trigger("reset");
  $newStoryForm.hide();
  $allStoriesList.show();
}
$newStoryForm.on("submit", putStoryOnPage)


