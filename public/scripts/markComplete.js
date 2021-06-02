$(() => {
  //   //Mark Story Complete Handler
  $(document).on("click", ".mark-complete-btn", function () {
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    $.post(`/stories/${story_id}`, { story_id: story_id })
      .then(() => {
        $.get(`/stories/${story_id}`)
          .then((data) => {
            const { story } = data;
            $(".content-container").empty();
            $(".content-container").removeClass("view-story-container");
            renderViewedStory(story, ".content-container", false);
          })
          .then(() => {
            $.get(`/stories/${story_id}/acceptedContributions`)
            .then(data => {
              data.map(data => {
                $('.contributions-container').append(`<p>${data.content}</p>`)
              })
            })
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  });
});
