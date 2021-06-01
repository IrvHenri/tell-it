/*
///////////////////////////////////////////////////
ISOLATED CODE TO BE REVIEWED
///////////////////////////////////////////////////
*/


// $(() => {
//   $(document).on("click", ".view-story-btn", function (e) {
//     $(".content-container").empty();

//     $(".content-container").addClass("view-story-container");
//     const story_id = $(this).closest("article[data-id]").attr("data-id");
//     let $contributionForm = $(`
//     <div class = 'side-bar'>
//     <div class= 'contribution-form'>
//       <h2>Submit a contribution!</h2>

//       <textarea id ='content' name="content" class='text-field'  rows="4" cols="50" placeholder = "What happens next?" required ></textarea>
//         <button type="button" class = 'submit-contribution' >Submit</button>
//       </div>
//       <div class ='contribution-container'>
//       </div>
//     </div>

//       `);
//     $.ajax(`/stories/${story_id}`)
//       .then((data) => {
//         const { story, contributions } = data;
//         //////----------------------------/////////////////
//         //  *** MAY HAVE TO REVIEW THIS LOGIC *** ////
//         //////----------------------------/////////////////
//         //Condition check to display mark story complete button
//         const user_id = Number(localStorage.user_id);
//         const story_user_id = story.user_id;
//         console.log("user_id", localStorage.user_id);
//         console.log("story.user_id", story.user_id);
//         if (story.is_complete) {
//           renderViewedStory(story, ".content-container", false);
//         } else if (user_id === story_user_id) {
//           // Bug with this condition - user can only see contributions and not story
//           // if i take out $(".content-container").prepend($contributionForm);
//           // and change renderContributions(contributions, ".content-container");
//           // story will not appear
//           $(".content-container").prepend($contributionForm);
//           renderViewedStory(story, ".content-container", true);
//           renderContributions(contributions, ".contribution-container");
//         } else if (user_id !== story_user_id) {
//           $(".content-container").prepend($contributionForm);
//           renderContributions(contributions, ".contribution-container");
//           renderViewedStory(story, ".content-container", false);
//         }

//         // $(".content-container").prepend($contributionForm);
//         // renderContributions(contributions, ".contribution-container");
//       })
//       .catch((err) => console.log(err));

//     //Submit Contribution Handler  **** BUG when user submits contribution the story changes to their id
//     $(document).on("click", ".submit-contribution", () => {
//       const content = $("#content").val();
//       const user_id = localStorage.user_id;
//       $.post(`/stories/${story_id}/contribution`, {
//         user_id,
//         story_id,
//         content,
//       }).then(() => {
//         $(".contribution-form textarea").val("");
//         $.ajax(`/stories/${story_id}`).then((data) => {
//           const { story, contributions } = data;
//           $(".content-container").empty();
//           $(".content-container").prepend($contributionForm);
//           renderViewedStory(story, ".content-container", false);
//           renderContributions(contributions, ".contribution-container");
//         });
//       });
//     });
//   });

//   //Mark Story Complete Handler
//   $(document).on("click", ".mark-complete-btn", function () {
//     const story_id = $(this).closest("article[data-id]").attr("data-id");
//     $.post(`/stories/${story_id}`, { story_id: story_id })
//       .then(() => {
//         $.get(`/stories/${story_id}`)
//           .then((data) => {
//             const { story } = data;
//             $(".content-container").empty();
//             renderStory(story, ".content-container");
//           })
//           .catch((e) => console.log(e));
//       })
//       .catch((e) => console.log(e));
//   });
// });
