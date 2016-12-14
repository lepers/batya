function commentTreeVisibility(parent, visible) {
	var children = $(".comment[data-parent_comment_id=" + parent.attr("id") + "]");
	if (!children.length)
		return;

	children.each(function() {
		var child = $(this);
		child.css("display", visible ? "block" : "none");

		if (!child.attr("data-tree-hidden"))
			commentTreeVisibility(child, visible);
	});
}

function createFoldButton() {
	return jQuery('<a/>', {
	    "class": "c_fold",
	    "text": "-"
	}).click(function() {
		if ($(this).text() == "+") {
			$(this).text("-");
			$(this).parents(".comment").removeAttr("data-tree-hidden");
			commentTreeVisibility($(this).parents(".comment"), true);
		} else {
			$(this).text("+");
			$(this).parents(".comment").attr("data-tree-hidden", 1);
			commentTreeVisibility($(this).parents(".comment"), false);
		}
	});
}

// === *** MAGIC *** ===
(function() {
	$(".b-comment_thread_collapse").remove();

	var op = $(".post").attr("data-user_id");
	var comments = $(".comment")

	var hasChildren = new Map();
	comments.each(function() {
		hasChildren.set($(this).attr("data-parent_comment_id"), true);
	})

	comments.each(function() {
		// fold 'em all
		if (hasChildren.get($(this).attr("id")) == true) {
			var button = createFoldButton();
			$(this).children().find(".ddi").prepend(button);
		}

		// if OP
		if ($(this).attr("data-user_id") == op) {
			$(this).find(".ddi .c_user").addClass("originalposter");
			$(this).find(".b-c_o").css("border-style", "none");
		}

		// colorize
		$(this).find(".vote_result").each(function() {
			var score = $(this).text();
			if (score > 0) {
				$(this).addClass("positive");
			} else if (score < 0) {
				$(this).addClass("negative");
			}
		})
	});
})()
